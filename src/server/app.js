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

app.use((req, res) => {
    if (req.accepts('html')) {
        return res.status(404).render('errors/404', {
            title: 'Page not found'
        });
    }
    res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
    console.error(err);

    if (req.accepts('html')) {
        return res.status(500).render('errors/500', {
            title: 'Server Error',
            message: 'Something went wrong'
        });
    }
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});