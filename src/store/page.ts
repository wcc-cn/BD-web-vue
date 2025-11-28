import { defineStore } from "pinia";

export const usePageStore = defineStore("pageStore", {
  state: () => {
    return {
        pageName:""
    };
  },
  getters: {
    getStatus: (state) => {return state.pageName}
  },
  actions: {
    setPageName(name: string) {
      this.pageName = name;
    }
  }
});
