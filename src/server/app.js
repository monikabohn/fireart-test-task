import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import teamsRoutes from "./routes/teams.routes.js";
import expressLayouts from 'express-ejs-layouts';
import apiRoutes from "./routes/api.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.set('layout', 'layout');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.get('/', (req, res) => {
    res.redirect('/teams');
});
app.use("/", teamsRoutes);
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});