"use server";

import { z } from "zod";

const schema = z.object({ email: z.email("Please enter a valid email address.") });

export type NewsletterState =
  | { status: "idle" }
  | { status: "success"; email: string }
  | { status: "error"; message: string };

export async function subscribe(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }

  // Stage 2: insert into `newsletter_subscribers` (Supabase). Until the database
  // is connected the action only validates, so the UI can be reviewed end to end.
  await new Promise((r) => setTimeout(r, 600));

  return { status: "success", email: parsed.data.email };
}
