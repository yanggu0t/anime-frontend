import { CombinedResultType } from "@/types/anime";
import { createStore } from "zustand/vanilla";

export type AnimeState = {
  animeList: CombinedResultType[];
  isAnimeLoading: boolean;
  animeError: Error | null;
};

export type AnimeActions = {
  setAnimeList: (animeList: CombinedResultType[]) => void;
  setIsAnimeLoading: (isAnimeLoading: boolean) => void;
  setAnimeError: (animeError: Error | null) => void;
};

export type AnimeStore = AnimeState & AnimeActions;

export const initAnimeStore = (): AnimeState => {
  return { animeList: [], isAnimeLoading: false, animeError: null };
};

export const defaultInitState: AnimeState = {
  animeList: [],
  isAnimeLoading: false,
  animeError: null,
};

export const createAnimeStore = (initState: AnimeState = defaultInitState) => {
  return createStore<AnimeStore>()((set) => ({
    ...initState,
    setAnimeList: (animeList: CombinedResultType[]) => set({ animeList }),
    setIsAnimeLoading: (isAnimeLoading: boolean) => set({ isAnimeLoading }),
    setAnimeError: (animeError: Error | null) => set({ animeError }),
  }));
};
