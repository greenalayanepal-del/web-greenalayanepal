import { expect, test, type Page } from "@playwright/test";

const publicRoutes = [
  "/",
  "/about",
  "/advisors",
  "/projects",
  "/research",
  "/publications",
  "/team",
  "/news",
  "/blog",
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

test("team page renders modern showcase", async ({ page }) => {
  await page.goto("/team");
  await expect(
    page.getByRole("heading", { level: 1, name: "Our Team" }),
  ).toBeVisible();
  await expect(page.getByText("Nabin Sapkota")).toBeVisible();
  await expect(page.getByText("Siddhartha Sapkota")).toBeVisible();
});

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
  ).toHaveAttribute("href", "/contact?intent=volunteer");
  await expect(
    page.getByRole("link", { name: "Research Internship" })
  ).toHaveAttribute("href", "/contact?intent=internship");
  await expect(page.getByRole("link", { name: "Partner With Us" })).toHaveAttribute(
    "href",
    "/contact?intent=partner",
  );
});

test("home page hero and core sections render", async ({ page }) => {
  await page.goto("/");
  const heroCta = page.locator("#shader-hero-cta");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Building a Resilient Nepal Through Data-Driven Conservation/i,
    }),
  ).toBeVisible();
  await expect(
    heroCta.getByRole("link", { name: "Explore Our Work", exact: true }),
  ).toBeVisible();
  await expect(heroCta.getByRole("link", { name: "Get Involved" })).toHaveAttribute(
    "href",
    "#get-involved",
  );
  await expect(page.getByRole("heading", { name: "Our Mission" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Our Vision" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Strategic Pillars" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Thematic Areas" })).toBeVisible();
});

test("home page anchor links scroll to target sections", async ({ page }) => {
  await page.goto("/");
  const heroCta = page.locator("#shader-hero-cta");

  await expect(heroCta.getByRole("link", { name: "Get Involved" })).toHaveAttribute(
    "href",
    "#get-involved",
  );
  await expect(
    heroCta.getByRole("link", { name: "Explore Our Work", exact: true }),
  ).toHaveAttribute("href", "#thematic");

  await expect(page.locator("#get-involved")).toBeAttached();
  await expect(page.locator("#thematic")).toBeAttached();
});

test("contact intent pre-fills subject from home page CTA", async ({ page }) => {
  await page.goto("/");
  const volunteerLink = page
    .locator("#get-involved")
    .getByRole("link", { name: "Become a Volunteer" });
  await expect(volunteerLink).toHaveAttribute("href", "/contact?intent=volunteer");

  await page.goto("/contact?intent=volunteer");
  await expect(page.getByLabel("Subject")).toHaveValue("Volunteer inquiry");
});

test("publications page matches reports catalog layout", async ({ page }) => {
  await page.goto("/publications");

  await expect(page.getByPlaceholder("Type the keyword here")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Publications", level: 2 }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "All Publications" })).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: /Butterfly Images of Kathmandu Valley/i }).first(),
  ).toHaveAttribute("href", /\/publications\/butterfly-images-kathmandu-valley$/);
  await expect(page.getByText("2026").first()).toBeVisible();
});

test("publication detail page matches WWF-style layout", async ({ page }) => {
  await page.goto("/publications/butterfly-images-kathmandu-valley");

  await expect(
    page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("link", {
      name: "Publications",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Butterfly Images of Kathmandu Valley/i,
    }),
  ).toBeVisible();
  await expect(page.getByText(/Posted on/i)).toBeVisible();
  await expect(page.getByText("Language:")).toBeVisible();
  await expect(page.getByText("English")).toBeVisible();
  await expect(page.getByText("Publisher(s):")).toBeVisible();
  await expect(
    page.getByText("Greenalaya Nepal and TinyLife Finder"),
  ).toBeVisible();
  await expect(page.getByText("ISBN:")).toBeVisible();
  await expect(page.getByText("9789905-0-0219-7")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Download", level: 2 })).toBeVisible();
  await expect(page.getByRole("link", { name: "Download PDF" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Preview" })).toBeVisible();
});

test("research page links to publications", async ({ page }) => {
  await page.goto("/research");
  await expect(
    page.getByRole("main").getByRole("link", { name: "Publications" }),
  ).toHaveAttribute("href", "/publications");
});

test("/research/:slug redirects to /publications/:slug", async ({ page }) => {
  await page.goto("/research/butterfly-images-kathmandu-valley");
  await expect(page).toHaveURL(/\/publications\/butterfly-images-kathmandu-valley$/);
});

test("/resources redirects to /publications", async ({ page }) => {
  await page.goto("/resources");
  await expect(page).toHaveURL(/\/publications$/);
});

test("publications page uses theme background in dark mode", async ({ page }) => {
  await page.goto("/publications");
  await page.getByRole("button", { name: "Switch to dark mode" }).click();

  const mainBackground = await page
    .locator("main.bg-background")
    .evaluate((element) => getComputedStyle(element).backgroundColor);

  expect(mainBackground).not.toBe("rgb(255, 255, 255)");
  expect(mainBackground).toBe("rgb(15, 20, 16)");
});

test("footer links route to dedicated pages", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name === "mobile-chrome",
    "Desktop footer columns are hidden on mobile; covered by mobile accordion test.",
  );

  await page.goto("/");

  const footer = page.getByRole("contentinfo");
  const footerLinks = [
    { name: "About Greenalaya Nepal", path: "/about" },
    { name: "Advisors & Partners", path: "/advisors" },
    { name: "Team", path: "/team" },
    { name: "Projects", path: "/projects" },
    { name: "Research", path: "/research" },
    { name: "Publications", path: "/publications" },
    { name: "Blog", path: "/blog" },
    { name: "News", path: "/news" },
  ] as const;

  for (const link of footerLinks) {
    await expect(footer.getByRole("link", { name: link.name })).toHaveAttribute(
      "href",
      link.path,
    );
  }
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
  await expect(nav.getByRole("link", { name: "Publications" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "News" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Blog" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Research" })).toHaveCount(0);
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
  await expect(mobileNav.getByRole("link", { name: "Publications" })).toBeVisible();
  await expect(mobileNav.getByRole("link", { name: "News" })).toBeVisible();
  await expect(mobileNav.getByRole("link", { name: "Blog" })).toBeVisible();
  await expect(mobileNav.getByRole("link", { name: "Research" })).toHaveCount(0);
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
