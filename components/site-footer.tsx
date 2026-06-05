export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-emerald-100 bg-emerald-950 text-emerald-50">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <p className="font-semibold">Greenalaya Nepal</p>
        <p className="mt-1 text-sm text-emerald-100">
          Environmental research, conservation, and sustainable development in
          Nepal.
        </p>
        <p className="mt-4 text-xs text-emerald-200">
          © {new Date().getFullYear()} Greenalaya Nepal
        </p>
      </div>
    </footer>
  );
}
