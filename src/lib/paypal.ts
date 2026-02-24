/**
 * PayPal API helpers (server-side only)
 *
 * Environment variables:
 *   NEXT_PUBLIC_PAYPAL_CLIENT_ID — PayPal Client ID (also used client-side)
 *   PAYPAL_CLIENT_SECRET — PayPal Secret (server-only)
 *   PAYPAL_MODE — "sandbox" (default) or "live"
 */

const PAYPAL_BASE_URL =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

function getCredentials() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials not configured");
  }

  return { clientId, clientSecret };
}

async function getAccessToken(): Promise<string> {
  const { clientId, clientSecret } = getCredentials();

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("[paypal] Token error:", text);
    throw new Error("Failed to get PayPal access token");
  }

  const data = await response.json();
  return data.access_token;
}

export async function createPayPalOrder(params: {
  amountUSD: number;
  description: string;
  paymentId: string;
}): Promise<{ id: string }> {
  const accessToken = await getAccessToken();

  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: params.paymentId,
          description: params.description,
          amount: {
            currency_code: "USD",
            value: params.amountUSD.toFixed(2),
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("[paypal] Create order error:", text);
    throw new Error("Failed to create PayPal order");
  }

  return response.json();
}

export async function capturePayPalOrder(orderId: string): Promise<{
  id: string;
  status: string;
  purchase_units: Array<{
    reference_id: string;
    payments: {
      captures: Array<{
        id: string;
        status: string;
        amount: { currency_code: string; value: string };
      }>;
    };
  }>;
}> {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const text = await response.text();
    console.error("[paypal] Capture error:", text);
    throw new Error("Failed to capture PayPal order");
  }

  return response.json();
}
