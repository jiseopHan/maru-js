import { useCallback, useEffect, useState } from "react";

type Trigger = () => void;

interface Store {
  [key: string]: Maru;
}

interface Maru<T = any> {
  value: T;
  triggers: {
    [id: string]: Trigger;
  };
}

const store: Store = {};

type UseMaruReturn<T> = [T, (value: T) => void];

export const useMaruInitialization = (initialData: Record<string, any>) => {
  useEffect(() => {
    Object.keys(initialData).forEach((key) => {
      store[key] = { value: initialData[key], triggers: {} };
    });
  }, []);
};

export const useMaru = <T>(key: string): UseMaruReturn<T> => {
  const [id] = useState(Math.floor(Math.random() * 100000000000).toString());
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    if (shouldUpdate) {
      setShouldUpdate(false);
    }
  }, [shouldUpdate]);

  useEffect(() => {
    return () => {
      delete store[key].triggers[id];
    };
  }, [key, id]);

  if (!store[key]) {
    throw `The state for key '${key}' has not been initialized.`;
  }
  const maru = store[key] as Maru<T>;

  if (!maru.triggers[id]) {
    maru.triggers[id] = () => {
      setShouldUpdate(true);
    };
  }

  const setMaruState = useCallback(
    (value: T) => {
      maru.value = value;
      const { triggers } = maru;
      Object.keys(triggers).forEach((triggerId) => triggers[triggerId]());
    },
    [maru]
  );

  return [maru.value, setMaruState];
};

// for testing purpose
export const clearStore = () => {
  Object.keys(store).forEach((key) => delete store[key]);
};
