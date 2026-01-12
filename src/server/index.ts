import express, { Response } from 'express';
import cors from 'cors';
import path from "path";
import { dirname } from "path"; 
import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const distPath = path.join(_dirname, "..", "..", "dist");

// Import routes
import userGraphRoutes from './routes/userGraph';
import healthRoutes from './routes/health';
import getUsersRoutes from './routes/getUsers';
import narrativeRoutes from './routes/narrative';
import sessionStatsRoutes from './routes/sessionStats';
import openAiRoutes from './routes/openAi';


const app = express();
app.use(
	cors({
		origin: 'http://localhost:5173', // Allow only the Vue app's origin
		methods: ['GET', 'POST'], // Allow specific HTTP methods
		allowedHeaders: ['Content-Type'], // Allow specific headers
	}),
);
app.use(express.static(distPath)); // Middleware for parsing JSON

// Register routes
app.use('/api/userGraph', userGraphRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/getUsers', getUsersRoutes);
app.use('/api/narrative', narrativeRoutes);
app.use('/api/openAi', openAiRoutes);
app.use('/api/sessionStats', sessionStatsRoutes);

app.get("*", (req, res) => {
	res.sendFile(path.join(distPath, "index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
