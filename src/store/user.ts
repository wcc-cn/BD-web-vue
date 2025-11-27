import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      name: ''
    };
  },
  getters: {
     getStatus: (state) => state.name?'登录':'未登录'
  },
  actions: {
    updatUserName(name:string = '') {
        this.name = name
    },
  }
});