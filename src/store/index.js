import { defineStore } from "pinia";

export const useStore = defineStore("auth", {
    state: () => {
        return {
            accessToken: ""
        };
    }
});
