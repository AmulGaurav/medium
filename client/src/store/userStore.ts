import { create } from "zustand";

interface UserState {
  username: string;
  setUsername: (name: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  username: "",
  setUsername: (name: string) => set({ username: name }),
}));

export default useUserStore;
