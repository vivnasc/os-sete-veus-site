import type { Metadata } from "next";
import ApoiarClient from "./ApoiarClient";

export const metadata: Metadata = {
  title: "Apoiar a Loranne — Veus",
  description: "A musica e gratuita. Se te tocou, podes apoiar.",
};

export default function ApoiarPage() {
  return <ApoiarClient />;
}
