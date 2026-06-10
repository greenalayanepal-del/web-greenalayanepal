import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/about",
  "/projects",
  "/research",
  "/resources",
  "/team",
  "/news",
  "/contact",
];

for (const path of publicRoutes) {
  test(`loads ${path}`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("header").first()).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
}

test("contact form renders required fields", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Message")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
});

test("newsletter form renders on resources page", async ({ page }) => {
  await page.goto("/resources");
  await expect(page.getByRole("heading", { name: "Stay Updated" })).toBeVisible();
  await expect(page.getByPlaceholder("Your email address")).toBeVisible();
  await expect(page.getByRole("button", { name: "Subscribe" })).toBeVisible();
});

test("header includes primary navigation links", async ({ page }) => {
  await page.goto("/about");
  const nav = page.locator("header nav");
  await expect(nav.getByRole("link", { name: "Home" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "About" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Projects" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Research" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Resources" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Get Involved" })).toBeVisible();
});
