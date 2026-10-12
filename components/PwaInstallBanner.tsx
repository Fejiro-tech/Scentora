"use client";

import { useEffect, useRef, useState } from "react";

const DISMISS_KEY = "scentora-pwa-install-dismissed-at";
const INSTALLED_KEY = "scentora-pwa-installed";
const DISMISS_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

function isStandaloneDisplay(): boolean {
  const legacyNavigator = navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    legacyNavigator.standalone === true
  );
}

function getInstallInstructions(): { title: string; steps: string[] } {
  const userAgent = navigator.userAgent;
  const isAppleMobile =
    /iPhone|iPad|iPod/i.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isAppleMobile) {
    return {
      title: "Install on iPhone or iPad",
      steps: [
        "Open Scentora in Safari.",
        "Tap the Share icon (a square with an upward arrow).",
        'Tap "Add to Home Screen".',
        'Tap "Add".',
      ],
    };
  }

  if (/Android/i.test(userAgent)) {
    if (/Chrome/i.test(userAgent) && !/Edg|OPR|SamsungBrowser/i.test(userAgent)) {
      return {
        title: "Install on Android",
        steps: [
          "Open Chrome's three-dot menu (⋮) in the top-right corner.",
          'Tap "Install app" if available. If not, look for "Add to Home screen".',
          "Follow the on-screen confirmation.",
        ],
      };
    }

    return {
      title: "Install on Android",
      steps: [
        "Open your browser menu while viewing Scentora.",
        'Choose "Install app" or "Add to Home screen" if available.',
        "Follow the browser prompt to finish.",
      ],
    };
  }

  if (/Chrome/i.test(userAgent) && !/Edg|OPR/i.test(userAgent)) {
    return {
      title: "Install Scentora on desktop",
      steps: [
        "Open Scentora in Chrome.",
        "Click the install icon in the address bar if it appears.",
        "Follow the installation prompt. If the icon is absent, check Chrome's menu for the available install option.",
      ],
    };
  }

  if (/Firefox/i.test(userAgent)) {
    return {
      title: "Open Scentora as an app",
      steps: [
        "This browser may not offer web app installation.",
        "For an install option, open Scentora in Chrome or Edge and look for the install icon or Install page in the browser menu.",
      ],
    };
  }

  if (/Safari/i.test(userAgent) && !/Chrome|Chromium|Edg/i.test(userAgent)) {
    return {
      title: "Add Scentora to your Dock",
      steps: [
        "In Safari on macOS Sonoma or later, open the File menu.",
        "Choose Add to Dock and follow the prompt.",
      ],
    };
  }

  return {
    title: "Install from your browser",
    steps: [
      "Look for the install icon in the address bar, or open your browser menu.",
      "Choose Install app or Install this site as an app if available.",
      "The option varies by browser and version.",
    ],
  };
}

function persistInstalled(): void {
  try {
    window.localStorage.setItem(INSTALLED_KEY, "true");
  } catch (error) {
    console.warn("Scentora could not save the installed-app state:", error);
  }
}

export default function PwaInstallBanner() {
  const [isReady, setIsReady] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const promptEventRef = useRef<InstallPromptEvent | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const updateInstalledState = () => {
      if (isStandaloneDisplay()) {
        persistInstalled();
        setIsInstalled(true);
        promptEventRef.current = null;
      }
    };

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      promptEventRef.current = event as InstallPromptEvent;
    };

    const handleAppInstalled = () => {
      persistInstalled();
      promptEventRef.current = null;
      setIsInstalled(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt,
    );
    window.addEventListener("appinstalled", handleAppInstalled);
    const displayMode = window.matchMedia("(display-mode: standalone)");
    if (typeof displayMode.addEventListener === "function") {
      displayMode.addEventListener("change", updateInstalledState);
    } else {
      displayMode.addListener(updateInstalledState);
    }

    const initializationTimeout = window.setTimeout(() => {
      let storedInstalled = false;
      let dismissedRecently = false;

      try {
        storedInstalled =
          window.localStorage.getItem(INSTALLED_KEY) === "true";
        const dismissedAt = Number(
          window.localStorage.getItem(DISMISS_KEY) ?? 0,
        );
        dismissedRecently =
          dismissedAt > 0 && Date.now() - dismissedAt < DISMISS_DURATION_MS;
        if (dismissedAt > 0 && !dismissedRecently) {
          window.localStorage.removeItem(DISMISS_KEY);
        }
      } catch (error) {
        console.warn("Scentora could not read install preferences:", error);
      }

      if (storedInstalled || isStandaloneDisplay()) {
        setIsInstalled(true);
        if (!storedInstalled) persistInstalled();
      } else {
        setIsDismissed(dismissedRecently);
      }
      setIsReady(true);
    }, 0);

    return () => {
      window.clearTimeout(initializationTimeout);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      if (typeof displayMode.removeEventListener === "function") {
        displayMode.removeEventListener("change", updateInstalledState);
      } else {
        displayMode.removeListener(updateInstalledState);
      }
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (showInstructions && !dialog.open) {
      dialog.showModal();
    } else if (!showInstructions && dialog.open) {
      dialog.close();
    }
  }, [showInstructions]);

  async function handleInstallClick() {
    const promptEvent = promptEventRef.current;
    if (!promptEvent) {
      setShowInstructions(true);
      return;
    }

    promptEventRef.current = null;

    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice.outcome === "accepted") {
        persistInstalled();
        setIsInstalled(true);
      } else {
        setShowInstructions(true);
      }
    } catch (error) {
      console.error("Scentora could not open the install prompt:", error);
      setShowInstructions(true);
    }
  }

  function dismissBanner() {
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch (error) {
      console.warn("Scentora could not save the banner dismissal:", error);
    }
    setIsDismissed(true);
  }

  const instructions = showInstructions ? getInstallInstructions() : null;

  if (!isReady || isInstalled || isDismissed) {
    return null;
  }

  return (
    <>
      <aside
        aria-label="Install Scentora"
        className="fixed left-4 right-4 top-32 z-40 mx-auto max-w-lg border border-[rgba(198,164,106,0.45)] bg-[#F8F4EF] p-4 text-[#241d16] shadow-2xl sm:left-auto sm:right-6 sm:w-[min(28rem,calc(100vw-3rem))] sm:p-5"
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#c6a46a]/50 text-[#9a743c]"
          >
            <svg
              aria-hidden="true"
              className="size-4.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 17v3h14v-3" />
            </svg>
          </span>
          <div className="min-w-0 flex-1 pr-1">
            <p className="font-display text-lg leading-tight sm:text-xl">
              Keep Scentora close
            </p>
            <p className="mt-1 text-xs leading-5 text-[#554a3e] sm:text-sm">
              Add our fragrance experience to your home screen.
            </p>
            <button
              type="button"
              onClick={handleInstallClick}
              className="mt-3 inline-flex min-h-10 items-center justify-center bg-[#241d16] px-5 text-[0.68rem] uppercase tracking-[0.18em] text-[#F8F4EF] transition-colors hover:bg-[#9a743c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a743c]"
            >
              Install
            </button>
          </div>
          <button
            type="button"
            onClick={dismissBanner}
            aria-label="Dismiss install invitation"
            className="inline-flex size-8 shrink-0 items-center justify-center text-[#554a3e] transition-colors hover:text-[#241d16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a743c]"
          >
            <svg
              aria-hidden="true"
              className="size-4.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          </button>
        </div>
      </aside>

      <dialog
        ref={dialogRef}
        aria-labelledby="pwa-install-title"
        aria-describedby="pwa-install-description"
        onClose={() => setShowInstructions(false)}
        className="m-auto w-[calc(100%-2rem)] max-w-md border border-[rgba(198,164,106,0.55)] bg-[#F8F4EF] p-0 text-[#241d16] shadow-2xl backdrop:bg-black/70"
      >
        {instructions && (
          <div className="p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-[#9a743c]">
                  Scentora
                </p>
                <h2
                  id="pwa-install-title"
                  className="mt-2 font-display text-2xl sm:text-3xl"
                >
                  {instructions.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowInstructions(false)}
                aria-label="Close installation instructions"
                className="inline-flex size-9 shrink-0 items-center justify-center text-[#554a3e] transition-colors hover:text-[#241d16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a743c]"
              >
                <svg
                  aria-hidden="true"
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="m18 6-12 12M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ol
              id="pwa-install-description"
              className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-6 text-[#554a3e]"
            >
              {instructions.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => setShowInstructions(false)}
              className="mt-6 min-h-11 w-full border border-[#9a743c] text-xs uppercase tracking-[0.2em] text-[#5d4524] transition-colors hover:bg-[#eee5d9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a743c]"
            >
              Close
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
