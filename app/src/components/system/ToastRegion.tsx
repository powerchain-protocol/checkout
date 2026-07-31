import { useEffect, useState } from "react";

export interface AppToast {
  id: string;
  title: string;
  message?: string;
}

export function ToastRegion() {
  const [toasts, setToasts] = useState<AppToast[]>([]);

  useEffect(() => {
    const listener = (event: Event) => {
      const detail = (event as CustomEvent<AppToast>).detail;
      setToasts((current) => [...current, detail]);
      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== detail.id));
      }, 4200);
    };

    window.addEventListener("powerpay:toast", listener);
    return () => window.removeEventListener("powerpay:toast", listener);
  }, []);

  return (
    <div className="toast-region" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <article className="app-toast" key={toast.id}>
          <span className="app-toast__icon">✓</span>
          <div>
            <strong>{toast.title}</strong>
            {toast.message && <p>{toast.message}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}

export function showAppToast(title: string, message?: string) {
  window.dispatchEvent(
    new CustomEvent<AppToast>("powerpay:toast", {
      detail: {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        title,
        message,
      },
    }),
  );
}
