"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import {
  type AnimeStore,
  createAnimeStore,
  initAnimeStore,
} from "@/stores/store";

export const AnimeStoreContext = createContext<StoreApi<AnimeStore> | null>(
  null,
);

export interface AnimeStoreProviderProps {
  children: ReactNode;
}

export const AnimeStoreProvider = ({ children }: AnimeStoreProviderProps) => {
  const storeRef = useRef<StoreApi<AnimeStore>>();
  if (!storeRef.current) {
    storeRef.current = createAnimeStore(initAnimeStore());
  }

  return (
    <AnimeStoreContext.Provider value={storeRef.current}>
      {children}
    </AnimeStoreContext.Provider>
  );
};

export const useAnimeStore = <T,>(selector: (store: AnimeStore) => T): T => {
  const animeStoreContext = useContext(AnimeStoreContext);

  if (!animeStoreContext) {
    throw new Error(`useAnimeStore must be use within AnimeStoreProvider`);
  }

  return useStore(animeStoreContext, selector);
};
