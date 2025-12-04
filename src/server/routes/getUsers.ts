import express, { Request, Response } from 'express';
import mariadb from 'mariadb';
const router = express.Router();

const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	password: 'comsc',
	database: 'aiko_db',
});

router.get('/', async (req: Request, res: Response) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const rows = await conn.query('SELECT * FROM users;');
		res.json(rows);
	} catch (err) {
		res.status(500).send('database error ' + err);
	} finally {
		if (conn) conn.release();
	}
});

router.get('/:username', async (req: Request, res: Response) => {
	let conn;

	try {
		conn = await pool.getConnection();
		const rows = await conn.query('SELECT user_id FROM users WHERE username = ?;', [
			req.params.username,
		]);

		if (rows.length === 0) {
			return res.status(206).send('User not found');
		}
		res.json(rows[0]);
	} catch (err) {
		res.status(500).send('database error ' + err);
	} finally {
		if (conn) conn.release();
	}
});

router.post('/addUser/:username', async (req: Request, res: Response) => {
	let username = req.params.username;
	// Add user to the database
	let conn;
	try {
		conn = await pool.getConnection();
		// Insert user data into users table

		// Temp password for future password reset
		await conn.query('INSERT INTO users (username, password, progress) VALUES (?, ?, ?);', [
			username,
			'temp',
			'0'.repeat(28),
		]);
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
