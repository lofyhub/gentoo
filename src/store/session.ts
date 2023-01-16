import { defineStore } from "pinia";
// https://pinia.vuejs.org/core-concepts/

export interface Session {
  _id: string;
  userId: string;
  username: string;
  email: string;
  regDate: string;
  kikaotype: string;
}

export const useSessionStore = defineStore(`session`, {
  state: (): Session => {
    return {
      _id: ``,
      userId: ``,
      username: ``,
      email: ``,
      regDate: ``,
      kikaotype: ``,
    };
  },
  persist: true,
  actions: {
    setSessionData(data: Session) {
      if (!data) {
        return;
      }
      (this._id = data._id),
        (this.username = data.username),
        (this.email = data.email),
        (this.regDate = data.regDate),
        (this.kikaotype = data.kikaotype),
        (this.userId = data.userId);
    },
  },
  getters: {},
});
