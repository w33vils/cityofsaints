import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand revalidation triggered by Strapi webhook.
 *
 * Strapi webhook config:
 *   URL: https://your-frontend.com/api/revalidate
 *   Headers: { "x-revalidate-secret": "YOUR_SECRET" }
 *   Events: entry.publish, entry.unpublish, entry.update, entry.delete
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  const expectedSecret = process.env.REVALIDATION_SECRET;

  // Require secret in production
  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => null);
    const model = body?.model;

    // Revalidate specific paths based on which content type changed
    const pathMap: Record<string, string[]> = {
      sermon: ["/", "/media/sermons"],
      "sermon-series": ["/", "/media/sermons"],
      event: ["/", "/events"],
      "event-registration": [],
      location: ["/visit", "/locations"],
      "team-member": ["/about", "/team"],
      ministry: ["/ministries"],
      initiative: ["/about"],
      article: ["/", "/media/articles"],
      class: ["/get-involved"],
      "home-page": ["/"],
      "give-page": ["/give"],
      "site-setting": ["/"],
    };

    const paths = model ? pathMap[model] || ["/"] : ["/"];

    for (const path of paths) {
      revalidatePath(path);
    }

    // Always revalidate the home page
    revalidatePath("/");

    return NextResponse.json({
      revalidated: true,
      paths,
      timestamp: Date.now(),
    });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
