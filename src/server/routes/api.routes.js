import { Router } from "express";
import { getPlayersByTeamId } from "../services/sports.service.js";

const router = Router();

router.get("/teams/:id/players", async (req, res, next) => {
    try {
        const players = await getPlayersByTeamId(req.params.id);
        res.json(players);
    } catch (err) {
        next(err);
    }
});

export default router;