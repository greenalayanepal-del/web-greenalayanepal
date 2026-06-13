#!/usr/bin/env node
/**
 * Add Resend contact-alert env vars to Vercel production and redeploy.
 *
 * Usage (PowerShell):
 *   $env:RESEND_API_KEY="re_..."
 *   node scripts/setup-contact-alerts.mjs
 *
 * Optional overrides:
 *   CONTACT_NOTIFY_EMAIL (default: info@greenalayanepal.org.np)
 *   CONTACT_FROM_EMAIL   (default: Greenalaya Nepal <onboarding@resend.dev>)
 */

import { spawnSync } from "node:child_process";

const apiKey = process.env.RESEND_API_KEY?.trim();
if (!apiKey) {
  console.error(
    "Missing RESEND_API_KEY. Create one at https://resend.com/api-keys then rerun."
  );
  process.exit(1);
}

const notifyEmail =
  process.env.CONTACT_NOTIFY_EMAIL?.trim() || "info@greenalayanepal.org.np";
const fromEmail =
  process.env.CONTACT_FROM_EMAIL?.trim() ||
  "Greenalaya Nepal <onboarding@resend.dev>";

const vars = [
  ["RESEND_API_KEY", apiKey],
  ["CONTACT_NOTIFY_EMAIL", notifyEmail],
  ["CONTACT_FROM_EMAIL", fromEmail],
];

function run(command, args, input) {
  const result = spawnSync(command, args, {
    stdio: input ? ["pipe", "inherit", "inherit"] : "inherit",
    encoding: "utf8",
    input,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

for (const [name, value] of vars) {
  console.log(`\nSetting production env: ${name}`);
  run(
    "npx",
    ["vercel", "env", "add", name, "production", "--force"],
    `${value}\n`
  );
}

console.log("\nRedeploying production...");
run("npx", ["vercel", "deploy", "--prod", "--yes"]);
console.log("\nDone. Submit a test message at /contact to verify email delivery.");
