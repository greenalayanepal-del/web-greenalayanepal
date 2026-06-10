import type { Metadata } from "next";
import { ShaderTestPreview } from "@/components/shader-test-preview";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Shader Hero Preview",
  description: `Preview of the community photo hero background for ${siteConfig.name}.`,
  path: "/shader-test",
});

export default function ShaderTestPage() {
  return <ShaderTestPreview />;
}
