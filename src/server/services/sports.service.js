import axios from "axios";
const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

export async function getAllTeams() {
    const { data } = await axios.get(`${BASE_URL}/search_all_teams.php`, {
        params: { l: 'English Premier League' },
    });

    return data.teams ?? [];
}

export async function getTeamById(id) {
    const { data } = await axios.get(`${BASE_URL}/lookupteam.php`, {
        params: { id },
    });

    return data.teams?.[0] ?? null;
}

export async function getPlayersByTeamId(teamId) {
    const { data } = await axios.get(`${BASE_URL}/lookup_all_players.php`, {
        params: { id: teamId },
    });

    return data.player ?? [];
}

export async function getPlayerById(id) {
    const { data } = await axios.get(`${BASE_URL}/lookupplayer.php`, {
        params: { id }
    });

    return data.players?.[0] ?? null;
}
