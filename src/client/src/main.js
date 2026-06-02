import { createApp } from "vue";
import './style.css'
import PlayersApp from "./PlayersApp.vue";

const el = document.getElementById("players-app");

if (el) {
    createApp(PlayersApp, {
        teamId: el.dataset.teamId,
    }).mount("#players-app");
}