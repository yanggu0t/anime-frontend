import { CombinedResultType } from "@/types/anime";
import { createStore } from "zustand/vanilla";

export type AnimeState = {
  animeList: CombinedResultType[];
  isAnimeLoading: boolean;
};

export type AnimeActions = {
  setAnimeList: (animeList: CombinedResultType[]) => void;
  setIsAnimeLoading: (isAnimeLoading: boolean) => void;
};

export type AnimeStore = AnimeState & AnimeActions;

export const initAnimeStore = (): AnimeState => {
  return { animeList: [], isAnimeLoading: false };
};

export const defaultInitState: AnimeState = {
  animeList: [],
  isAnimeLoading: false,
};

export const createAnimeStore = (initState: AnimeState = defaultInitState) => {
  return createStore<AnimeStore>()((set) => ({
    ...initState,
    setAnimeList: (animeList: CombinedResultType[]) => set({ animeList }),
    setIsAnimeLoading: (isAnimeLoading: boolean) => set({ isAnimeLoading }),
  }));
};
