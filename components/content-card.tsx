import { cn } from "@/lib/utils";

type ContentCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function ContentCard({ children, className }: ContentCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
