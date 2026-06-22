type PageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-24 pb-12 md:pt-28">
      <h1 className="text-3xl font-bold text-secondary-foreground">{title}</h1>
      <p className="mt-2 text-muted-foreground">{description}</p>
      {children}
    </main>
  );
}
