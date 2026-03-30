"use client";

import { useState, useEffect } from "react";

/**
 * "Receber novidades" — subscribe to new releases via WhatsApp.
 * Only visible when album has published audio.
 * Asks for WhatsApp number on first click.
 */
export default function SubscribeButton({ albumSlug }: { albumSlug: string }) {
  const [hasPublished, setHasPublished] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [name, setName] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedNumber, setSavedNumber] = useState<string | null>(null);

  // Check if album has published tracks
  useEffect(() => {
    fetch("/api/published-tracks")
      .then(r => r.json())
      .then((data: { tracks: string[] }) => {
        const hasAudio = (data.tracks || []).some((t: string) => t.startsWith(albumSlug + "-t"));
        setHasPublished(hasAudio);
      })
      .catch(() => {});
  }, [albumSlug]);

  // Check saved number from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("veus-whatsapp");
    if (saved) {
      setSavedNumber(saved);
      // Check if subscribed
      fetch(`/api/subscribe-releases?whatsapp=${encodeURIComponent(saved)}`)
        .then(r => r.json())
        .then(d => setSubscribed(d.subscribed))
        .catch(() => {});
    }
  }, []);

  if (!hasPublished) return null;

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!whatsapp || whatsapp.length < 9) return;
    setLoading(true);

    const res = await fetch("/api/subscribe-releases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ whatsapp, name: name || null }),
    }).catch(() => null);

    if (res?.ok) {
      const clean = whatsapp.replace(/[^0-9+]/g, "");
      localStorage.setItem("veus-whatsapp", clean);
      setSavedNumber(clean);
      setSubscribed(true);
      setShowForm(false);
    }
    setLoading(false);
  }

  async function handleUnsubscribe() {
    if (!savedNumber) return;
    setLoading(true);
    await fetch("/api/subscribe-releases", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ whatsapp: savedNumber }),
    }).catch(() => {});
    setSubscribed(false);
    setLoading(false);
  }

  // Already subscribed — show toggle
  if (subscribed && savedNumber) {
    return (
      <button
        onClick={handleUnsubscribe}
        disabled={loading}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm border text-[#C9A96E] border-[#C9A96E]/30 bg-[#C9A96E]/5 transition-colors hover:bg-[#C9A96E]/10 disabled:opacity-50"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
        </svg>
        Subscrito
      </button>
    );
  }

  // Show form
  if (showForm) {
    return (
      <form onSubmit={handleSubscribe} className="flex items-center gap-2">
        <input
          type="tel"
          value={whatsapp}
          onChange={e => setWhatsapp(e.target.value)}
          placeholder="+258 84 ..."
          required
          className="w-36 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[#F5F0E6] placeholder-[#666680] focus:outline-none focus:border-[#C9A96E]/50"
          autoFocus
        />
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nome (opcional)"
          className="w-28 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[#F5F0E6] placeholder-[#666680] focus:outline-none focus:border-[#C9A96E]/50"
        />
        <button
          type="submit"
          disabled={loading || whatsapp.length < 9}
          className="px-4 py-2 rounded-full bg-[#C9A96E] text-[#0D0D1A] text-sm font-medium hover:bg-[#d4b87a] transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "OK"}
        </button>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="p-2 text-[#666680] hover:text-[#a0a0b0]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </form>
    );
  }

  // Default — show subscribe button
  return (
    <button
      onClick={() => savedNumber ? handleSubscribe(new Event("") as unknown as React.FormEvent) : setShowForm(true)}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm text-[#a0a0b0] border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-50"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      </svg>
      Receber novidades
    </button>
  );
}
