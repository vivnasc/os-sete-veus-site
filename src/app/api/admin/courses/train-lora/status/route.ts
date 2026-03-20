import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/admin/courses/train-lora/status?id=TRAINING_ID
 * Checks the status of a Replicate training.
 *
 * Returns: {
 *   status: "starting" | "processing" | "succeeded" | "failed" | "canceled",
 *   progress?: number,         // 0-100 if available
 *   output?: { weights: string, ... },  // URL to download LoRA weights when done
 *   logs?: string,
 *   error?: string,
 * }
 */
export async function GET(req: NextRequest) {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      { erro: "REPLICATE_API_TOKEN nao configurado." },
      { status: 500 }
    );
  }

  const trainingId = req.nextUrl.searchParams.get("id");
  if (!trainingId) {
    return NextResponse.json(
      { erro: "Parametro 'id' obrigatorio." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.replicate.com/v1/trainings/${trainingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

    // Extract progress from logs if available
    let progress: number | undefined;
    if (training.logs) {
      // Replicate logs often contain step progress like "step 500/1000"
      const match = training.logs.match(/step\s+(\d+)\s*\/\s*(\d+)/i);
      if (match) {
        progress = Math.round((parseInt(match[1]) / parseInt(match[2])) * 100);
      }
    }

    return NextResponse.json({
      status: training.status,
      progress,
      output: training.output || null,
      error: training.error || null,
      logs_tail: training.logs ? training.logs.slice(-500) : null,
      started_at: training.started_at,
      completed_at: training.completed_at,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro desconhecido";
    return NextResponse.json({ erro: message }, { status: 500 });
  }
}
