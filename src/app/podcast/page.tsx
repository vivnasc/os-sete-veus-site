import type { Metadata } from "next";
import { PODCAST_META } from "@/data/podcast-series";
import PodcastContent from "./PodcastContent";

export const metadata: Metadata = {
  title: "Podcast — Os Sete Veus | Conversas com o Espelho",
  description: PODCAST_META.description,
};

export default function PodcastPage() {
  return <PodcastContent />;
}
