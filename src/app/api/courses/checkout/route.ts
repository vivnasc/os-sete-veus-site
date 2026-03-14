import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

/**
 * POST /api/courses/checkout
 * Creates a Stripe Checkout Session for course enrollment.
 *
 * Body: { courseSlug: string }
 * Returns: { url: string } (Stripe checkout URL)
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Nao autenticado" },
        { status: 401 }
      );
    }

    const { courseSlug } = await request.json();
    if (!courseSlug) {
      return NextResponse.json(
        { error: "courseSlug obrigatorio" },
        { status: 400 }
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Stripe nao configurado" },
        { status: 500 }
      );
    }

    // Check if already enrolled
    const { data: existing } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", user.id)
      .eq("course_id", courseSlug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "Ja inscrito neste curso" },
        { status: 400 }
      );
    }

    // Look up course in database for stripe_price_id
    const { data: course } = await supabase
      .from("courses")
      .select("id, title, stripe_price_id, price_cents, currency")
      .eq("slug", courseSlug)
      .single();

    if (!course) {
      return NextResponse.json(
        { error: "Curso nao encontrado" },
        { status: 404 }
      );
    }

    // Create Stripe Checkout Session
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

    const lineItems = course.stripe_price_id
      ? [{ price: course.stripe_price_id, quantity: 1 }]
      : [
          {
            price_data: {
              currency: (course.currency || "usd").toLowerCase(),
              product_data: { name: course.title },
              unit_amount: course.price_cents || 4900,
            },
            quantity: 1,
          },
        ];

    const stripeRes = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          mode: "payment",
          "line_items[0][quantity]": "1",
          ...(course.stripe_price_id
            ? { "line_items[0][price]": course.stripe_price_id }
            : {
                "line_items[0][price_data][currency]": (
                  course.currency || "usd"
                ).toLowerCase(),
                "line_items[0][price_data][product_data][name]": course.title,
                "line_items[0][price_data][unit_amount]": String(
                  course.price_cents || 4900
                ),
              }),
          success_url: `${baseUrl}/cursos/${courseSlug}/dashboard?success=true`,
          cancel_url: `${baseUrl}/cursos/${courseSlug}?cancelled=true`,
          "metadata[user_id]": user.id,
          "metadata[course_slug]": courseSlug,
          "metadata[course_id]": course.id,
          customer_email: user.email || "",
        }).toString(),
      }
    );

    const session = await stripeRes.json();

    if (!stripeRes.ok) {
      console.error("Stripe error:", session);
      return NextResponse.json(
        { error: "Erro ao criar sessao de pagamento" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}
