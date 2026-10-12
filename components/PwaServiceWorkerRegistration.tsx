"use client";

import { useEffect } from "react";

export default function PwaServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    const showOfflinePage = () => {
      if (window.location.pathname !== "/offline") {
        window.location.replace("/offline");
      }
    };

    window.addEventListener("offline", showOfflinePage);
    if (!navigator.onLine) {
      showOfflinePage();
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .catch((error: unknown) => {
          console.error("Scentora service worker registration failed:", error);
        });
    }

    return () => {
      window.removeEventListener("offline", showOfflinePage);
    };
  }, []);

  return null;
}
