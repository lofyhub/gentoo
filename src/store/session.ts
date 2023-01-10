import { defineStore } from "pinia";
// https://pinia.vuejs.org/core-concepts/

export interface Session {
  id: string;
  name: string;
  email: string;
  bio: string;
  location: string;
  avatar: string;
}

export const useStore = defineStore(`session`, {
  state: (): Session => {
    return {
      name: ``,
      id: `vf`,
      avatar: ``,
      email: ``,
      location: ``,
      bio: ``,
    };
  },
  persist: true,
  actions: {},
  getters: {},
});
