import { expect, test, type Page } from "@playwright/test";

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
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });
}

test("contact form renders required fields", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Message")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
});

test("stay ahead section renders on home page", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Stay ahead with/i })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Become a Volunteer" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Research Internship" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Partner With Us" })).toBeVisible();
});

test("stay ahead section is not on other pages", async ({ page }) => {
  await page.goto("/about");
  await expect(
    page.getByRole("heading", { name: /Stay ahead with/i })
  ).toHaveCount(0);
});

async function openMobileNav(page: Page) {
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
}

test("header includes primary navigation links on desktop", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name === "mobile-chrome",
    "Desktop nav is hidden on mobile; covered by mobile nav test.",
  );

  await page.goto("/about");
  const nav = page.locator("header nav").first();
  await expect(nav.getByRole("link", { name: "Home" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "About" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Projects" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Research" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Resources" })).toBeVisible();
  await expect(
    page.getByRole("banner").getByRole("link", { name: "Get Involved" })
  ).toBeVisible();
});

test("mobile menu exposes primary navigation links", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile-chrome",
    "Mobile menu is only shown on small viewports.",
  );

  await page.goto("/about");
  await openMobileNav(page);

  const mobileNav = page.getByRole("navigation", { name: "Primary mobile" });
  await expect(mobileNav.getByRole("link", { name: "Home" })).toBeVisible();
  await expect(mobileNav.getByRole("link", { name: "About" })).toBeVisible();
  await expect(mobileNav.getByRole("link", { name: "Projects" })).toBeVisible();
  await expect(mobileNav.getByRole("link", { name: "Research" })).toBeVisible();
  await expect(mobileNav.getByRole("link", { name: "Resources" })).toBeVisible();
  await expect(
    page.getByRole("dialog").getByRole("link", { name: "Get Involved" })
  ).toBeVisible();

  await mobileNav.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
});

test("home page has no horizontal overflow on mobile", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile-chrome",
    "Overflow check targets the mobile viewport project.",
  );

  await page.goto("/");
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  expect(hasOverflow).toBe(false);
});
