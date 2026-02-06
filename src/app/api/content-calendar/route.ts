import { NextResponse } from "next/server";
import { generateWeekPlan, generateMonthPlan } from "@/lib/content-calendar";

/**
 * Content Calendar API
 * GET ?view=week&offset=0 — returns current week's content plan
 * GET ?view=month&offset=0 — returns current month's 4-week plan
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const view = searchParams.get("view") || "week";
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  if (view === "month") {
    const plans = generateMonthPlan(offset);
    return NextResponse.json({
      view: "month",
      offset,
      weeks: plans,
      totalMinutes: plans.reduce((sum, w) => sum + w.totalMinutes, 0),
    });
  }

  const plan = generateWeekPlan(offset);
  return NextResponse.json({
    view: "week",
    offset,
    ...plan,
  });
}
