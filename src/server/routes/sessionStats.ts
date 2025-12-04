import express, { Request, Response } from 'express';
import mariadb from 'mariadb';
const router = express.Router();

// pool for DB connection
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	password: 'comsc',
	database: 'aiko_db',
});

router.post('/', async (req: Request, res: Response) => {
	// Get the session data from the request body
	const sessionData = req.body;
	let conn;
	try {
		conn = await pool.getConnection();
		// Insert the session data into the database
		await conn.query(
			'INSERT INTO sessions ( user_id, seconds_played, audio_text_speed_add, audio_text_speed_sub, restart_count, game_end) VALUES (?, ?, ?, ?, ?, ?);',
			[
				sessionData.userId,
				sessionData.secondsPlayed,
				sessionData.audioTextSpeedAdd,
				sessionData.audioTextSpeedSubtract,
				sessionData.gameRestartCount,
				sessionData.gameEndCount,
			],
		);
	} catch (error) {
		console.error(error);
	} finally {
		if (conn) {
			conn.release();
		}
	}
	res.sendStatus(200);
});

export default router;
