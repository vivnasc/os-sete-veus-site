"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

/**
 * "Receber novidades" button — subscribe to new album release notifications.
 * Only visible when the album has published audio (not during production).
 */
export default function SubscribeButton({ albumSlug }: { albumSlug: string }) {
  const [email, setEmail] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasPublished, setHasPublished] = useState(false);

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

  // Get user email
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) {
        setEmail(data.user.email);
        // Check subscription status
        fetch(`/api/subscribe-releases?email=${encodeURIComponent(data.user.email)}`)
          .then(r => r.json())
          .then(d => setSubscribed(d.subscribed))
          .catch(() => setSubscribed(false));
      }
    });
  }, []);

  // Don't show if album not published or no user email
  if (!hasPublished || !email) return null;

  async function toggle() {
    if (!email) return;
    setLoading(true);

    if (subscribed) {
      await fetch("/api/subscribe-releases", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch(() => {});
      setSubscribed(false);
    } else {
      const { data } = await supabase.auth.getUser();
      await fetch("/api/subscribe-releases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userId: data.user?.id }),
      }).catch(() => {});
      setSubscribed(true);
    }

    setLoading(false);
  }

  if (subscribed === null) return null;

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm border transition-colors ${
        subscribed
          ? "text-[#C9A96E] border-[#C9A96E]/30 bg-[#C9A96E]/5"
          : "text-[#a0a0b0] border-white/10 hover:bg-white/5"
      } disabled:opacity-50`}
    >
      {subscribed ? (
        <>
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          Subscrito
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          Receber novidades
        </>
      )}
    </button>
  );
}
