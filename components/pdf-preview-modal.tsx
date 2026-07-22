"use client";

import { useCallback, useEffect, useRef } from "react";

type PdfPreviewModalProps = {
  title: string;
  pdfUrl: string;
  pageCount?: number;
  isOpen: boolean;
  onClose: () => void;
};

export function PdfPreviewModal({
  title,
  pdfUrl,
  pageCount,
  isOpen,
  onClose,
}: PdfPreviewModalProps) {
  const iframeSrc = isOpen ? pdfUrl : "";
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = document.activeElement;
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-preview-title"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-5">
          <h3
            id="pdf-preview-title"
            className="font-display text-lg font-bold text-foreground"
          >
            {title} — Preview
          </h3>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:bg-accent hover:rotate-90"
          >
            ×
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <iframe
            src={iframeSrc}
            title={`${title} PDF preview`}
            sandbox="allow-same-origin allow-scripts allow-popups"
            referrerPolicy="no-referrer"
            className="h-[70vh] min-h-[400px] w-full border-0"
          />
        </div>
        <div className="flex shrink-0 flex-col items-center justify-between gap-3 border-t border-border px-6 py-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {pageCount
              ? `Previewing document (${pageCount} pages)`
              : "Previewing document"}
          </p>
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Download Full PDF
          </a>
        </div>
      </div>
    </div>
  );
}
