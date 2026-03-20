import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/admin/courses/train-lora
 * Triggers SDXL LoRA training via Replicate API.
 *
 * The dataset ZIP is served from our own site at /downloads/seteveus-dataset.zip
 * Replicate downloads it, trains the LoRA, and returns the weights.
 *
 * Requires env var: REPLICATE_API_TOKEN
 *
 * Body (optional): {
 *   trigger_word?: string,        // default "seteveus_style"
 *   max_train_steps?: number,     // default 1000
 *   lora_lr?: number,             // default 1e-4
 *   resolution?: number,          // default 1024
 * }
 *
 * Returns: { training_id: string, status: string }
 */
export async function POST(req: NextRequest) {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      { erro: "REPLICATE_API_TOKEN nao configurado. Vai a Vercel → Settings → Environment Variables." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const trigger_word = body.trigger_word || "seteveus_style";
    const max_train_steps = body.max_train_steps || 1000;
    const lora_lr = body.lora_lr || 1e-4;
    const resolution = body.resolution || 1024;

    // The dataset ZIP URL - served statically from our own site
    const origin = req.headers.get("origin") || req.headers.get("host") || "";
    const protocol = origin.startsWith("http") ? "" : "https://";
    const datasetUrl = `${protocol}${origin}/downloads/seteveus-dataset.zip`;

    // Replicate model for SDXL LoRA training
    // Using the official stability-ai/sdxl training endpoint
    const response = await fetch(
      "https://api.replicate.com/v1/models/stability-ai/sdxl/versions/7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc/trainings",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: body.destination || undefined,
          input: {
            input_images: datasetUrl,
            token_string: trigger_word,
            caption_prefix: `${trigger_word}, `,
            max_train_steps,
            lora_lr,
            resolution,
            is_lora: true,
            seed: 42,
          },
          webhook: body.webhook || undefined,
          webhook_events_filter: ["completed"],
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { erro: `Replicate erro: ${response.status}`, detalhe: err },
        { status: response.status }
      );
    }

    const training = await response.json();

    return NextResponse.json({
      training_id: training.id,
      status: training.status,
      url: training.urls?.get || null,
      message: "Treino iniciado. Demora ~10-15 minutos.",
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro desconhecido";
    return NextResponse.json({ erro: message }, { status: 500 });
  }
}
