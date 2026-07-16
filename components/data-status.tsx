type DataErrorProps = {
  message: string;
};

export function DataError({ message }: DataErrorProps) {
  return (
    <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
      <p className="font-medium">Could not load content</p>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
}
