type PageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold text-emerald-900">{title}</h1>
      <p className="mt-2 text-neutral-600">{description}</p>
      {children}
    </main>
  );
}
