import { defineStore } from "pinia";
// https://pinia.vuejs.org/core-concepts/

export interface Session {
  id: string;
  userId: string;
  username: string;
  email: string;
  image: string;
}

export const useSessionStore = defineStore(`session`, {
  state: (): Session => {
    return {
      id: ``,
      userId: ``,
      username: ``,
      email: ``,
      image: ``,
    };
  },
  persist: true,
  actions: {
    setSessionData(data: Session) {
      if (!data) {
        return;
      }
      (this.id = data.id),
        (this.username = data.username),
        (this.email = data.email),
        (this.image = data.image),
        (this.userId = data.userId);
    },
  },
  getters: {},
});
