const EMPTY_SNAPSHOT = [];

export function createLocalStorageStore(key) {
  let snapshot = EMPTY_SNAPSHOT;
  let serializedSnapshot;
  const listeners = new Set();

  const getSnapshot = () => {
    if (typeof window === "undefined") return snapshot;

    const serialized = window.localStorage.getItem(key);
    if (serialized !== serializedSnapshot) {
      serializedSnapshot = serialized;
      snapshot = serialized === null ? EMPTY_SNAPSHOT : JSON.parse(serialized);
    }

    return snapshot;
  };

  const notify = () => {
    listeners.forEach((listener) => listener());
  };

  const handleStorage = (event) => {
    if (event.key === key || event.key === null) {
      serializedSnapshot = undefined;
      notify();
    }
  };

  return {
    getSnapshot,
    getServerSnapshot: () => EMPTY_SNAPSHOT,
    setSnapshot(nextSnapshot) {
      const next =
        typeof nextSnapshot === "function"
          ? nextSnapshot(getSnapshot())
          : nextSnapshot;
      const serialized = JSON.stringify(next);

      window.localStorage.setItem(key, serialized);
      snapshot = next;
      serializedSnapshot = serialized;
      notify();
    },
    subscribe(listener) {
      listeners.add(listener);
      window.addEventListener("storage", handleStorage);

      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", handleStorage);
      };
    },
  };
}
