import { redirect } from "next/navigation";

export default async function LeituraChapterRedirect({
  params,
}: {
  params: Promise<{ capitulo: string }>;
}) {
  const { capitulo } = await params;
  redirect(`/membro/espelhos/veu-da-ilusao/${capitulo}`);
}
