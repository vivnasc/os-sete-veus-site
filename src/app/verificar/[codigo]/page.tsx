import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verificar Certificado — Sete Véus",
  description: "Verificação pública de certificados de curso.",
};

type PageProps = {
  params: Promise<{ codigo: string }>;
};

async function verifyCertificate(code: string) {
  try {
    const { createSupabaseAdminClient } = await import(
      "@/lib/supabase-server"
    );
    const admin = createSupabaseAdminClient();
    if (!admin) return null;

    const { data } = await admin.rpc("verify_certificate", { p_code: code });
    if (data && data.length > 0) return data[0];
    return null;
  } catch {
    return null;
  }
}

export default async function VerificarCertificadoPage({
  params,
}: PageProps) {
  const { codigo } = await params;
  const result = await verifyCertificate(codigo);

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="font-serif text-2xl text-white mb-8">
          Verificação de Certificado
        </h1>

        {result ? (
          <div className="bg-[#252547] border border-[#8B5CF6]/30 rounded-xl p-8">
            <div className="w-16 h-16 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-[#8B5CF6] text-2xl">✓</span>
            </div>
            <p className="text-[#C9A96E] font-serif text-lg mb-2">
              Certificado válido
            </p>
            <p className="text-white font-serif text-xl mb-4">
              {result.course_title}
            </p>
            <p className="text-[#a0a0b0] text-sm mb-1">{result.user_email}</p>
            <p className="text-[#606070] text-xs">
              Concluído em{" "}
              {new Date(result.completed_at).toLocaleDateString("pt-PT", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-[#606070] text-xs mt-4">
              Código: {codigo}
            </p>
          </div>
        ) : (
          <div className="bg-[#252547] border border-[#606070]/30 rounded-xl p-8">
            <p className="text-[#a0a0b0] mb-2">
              Certificado não encontrado.
            </p>
            <p className="text-[#606070] text-sm">
              Verifica o código e tenta novamente.
            </p>
            <p className="text-[#606070] text-xs mt-4">
              Código verificado: {codigo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
