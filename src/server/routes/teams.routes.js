import { Router } from 'express';
import {
    getAllTeams,
    getTeamById,
    getPlayersByTeamId,
    getPlayerById
} from '../services/sports.service.js';
import { LEAGUE_NAME, LEAGUE_DESCRIPTION } from '../constants/league.constants.js';

const router = Router();

router.get('/teams', async (req, res, next) => {
    try {
        const teams = await getAllTeams();

        res.render("pages/teams", {
            title: LEAGUE_NAME,
            description: LEAGUE_DESCRIPTION,
            teams,
            breadcrumb: [
                { label: LEAGUE_NAME }
            ]
        });
    } catch (err) {
        next(err);
    }
});

router.get('/teams/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const [ team, players ] = await Promise.all([
            getTeamById(id),
            getPlayersByTeamId(id),
        ]);

        if (!team) {
            return res.status(404).render('pages/404',
            { message: 'Team not found' }
            );
        }

        res.render("pages/team", {
            title: team.strTeam,
            team,
            players,
            breadcrumb: [
                { label: LEAGUE_NAME, href: "/teams" },
                { label: team.strTeam }
            ]
        });
    } catch (err) {
        next(err);
    }
});

router.get("/players/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const player = await getPlayerById(id);

        if (!player) {
            return res.status(404).render('pages/404',
            { message: 'Player not found' }
            );
        }

        res.render("pages/player", {
            title: player.strPlayer,
            player,
            breadcrumb: [
                { label: LEAGUE_NAME, href: "/teams" },
                { label: player.strTeam, href: `/teams/${player.idTeam}` },
                { label: player.strPlayer }
            ]
        });
    } catch (err) {
        next(err);
    }
});
export default router;


