import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { githubContributionsCacheTag } from "@/lib/github-contributions";

export const dynamic = "force-dynamic";

export function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const suppliedSecret = request.headers.get("x-revalidate-secret");

  if (!secret || suppliedSecret !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(githubContributionsCacheTag, "max");
  revalidatePath("/");

  return NextResponse.json({ revalidated: true });
}
