import express, { Request, Response } from 'express';
import type { Pool } from 'mariadb';

let MariaDB: typeof import('mariadb') | null = null;
let dbPool: Pool | null = null;

async function getDBPool(): Promise<Pool> {
	if (!dbPool) {
		if (!MariaDB) {
			MariaDB = await import('mariadb');
		}
		dbPool = MariaDB.createPool({
			host: 'localhost',
			user: 'root',
			password: 'comsc',
			database: 'aiko_db',
		});
	}
	return dbPool;
}

export function setMockDBPool(mockPool: Pool) {
	dbPool = mockPool;
}

const router = express.Router();
router.get('/', async (req: Request, res: Response) => {
	let conn;
	try {
		const pool = await getDBPool();
		conn = await pool.getConnection();
		const rows = await conn.query('SELECT * FROM stages;');
		res.json(rows);
	} catch (err) {
		res.status(500).send('database error ' + err);
	} finally {
		if (conn) conn.release();
	}
});

router.get('/:id/choice1', async (req: Request, res: Response) => {
	let conn;
	const { id } = req.params;
	try {
		const pool = await getDBPool();
		conn = await pool.getConnection();
		const stageRow = await conn.query('SELECT choice_id_1 FROM stages WHERE stage_id = ?;', [
			id,
		]);
		const choiceId = stageRow[0].choice_id_1;
		const choiceRow = await conn.query('SELECT * FROM choices WHERE choice_id = ?;', [
			choiceId,
		]);
		res.json(choiceRow[0]);
	} catch (err) {
		res.status(500).send('database error ' + err);
	} finally {
		if (conn) conn.release();
	}
});

router.get('/:id/choice2', async (req: Request, res: Response) => {
	let conn;
	const { id } = req.params;
	try {
		const pool = await getDBPool();
		conn = await pool.getConnection();
		const stageRow = await conn.query('SELECT choice_id_2 FROM stages WHERE stage_id = ?;', [
			id,
		]);
		const choiceId = stageRow[0].choice_id_2;
		const choiceRow = await conn.query('SELECT * FROM choices WHERE choice_id = ?;', [
			choiceId,
		]);
		res.json(choiceRow[0]);
	} catch (err) {
		res.status(500).send('database error ' + err);
	} finally {
		if (conn) conn.release();
	}
});

router.get('/:id', async (req: Request, res: Response) => {
	let conn;
	const { id } = req.params;
	try {
		const pool = await getDBPool();
		conn = await pool.getConnection();
		const rows = await conn.query('SELECT * FROM stages WHERE stage_id = ?;', [id]);
		if (rows.length === 0) {
			res.status(404).send('stage not found');
			return;
		}
		res.json(rows[0]);
	} catch (err) {
		res.status(500).send('database error ' + err);
	} finally {
		if (conn) conn.release();
	}
});

router.post('/:id/progress', async (req: Request, res: Response) => {
	let conn;
	const { id } = req.params;
	const { optionNumber: optionNumber, currentUser: currentUser } = req.body;
	if (optionNumber !== 1 && optionNumber !== 2) {
		res.status(400).send('invalid option number');
		return;
	}
	try {
		const pool = await getDBPool();
		conn = await pool.getConnection();
		const progress = optionNumber;
		const userRow = await conn.query('SELECT progress FROM users WHERE user_id = ?;', [
			currentUser,
		]);
		const currentUserProgress = userRow[0].progress;
		const index = parseInt(id) - 1;
		// replace nth character of progress
		const before = currentUserProgress.substring(0, index);
		const after = currentUserProgress.substring(index + 1);
		const newProgress = before + progress + after;
		await conn.query('UPDATE users SET progress = ? WHERE user_id = ?;', [
			newProgress,
			currentUser,
		]);
		res.json(newProgress);
	} catch (err) {
		res.status(500).send('database error ' + err);
	} finally {
		if (conn) conn.release();
	}
});

router.post('/progress/reset', async (req: Request, res: Response) => {
	let conn;
	const { currentUser: currentUser } = req.body;
	try {
		const pool = await getDBPool();
		conn = await pool.getConnection();
		await conn.query('UPDATE users SET progress = ? WHERE user_id = ?;', [
			'0'.repeat(28),
			currentUser,
		]);
		res.json('progress reset');
	} catch (err) {
		res.status(500).send('database error ' + err);
	} finally {
		if (conn) conn.release();
	}
});

router.get('/choiceCount/:stageId', async (req: Request, res: Response) => {
	let conn;
	const { stageId } = req.params;
	try {
		const pool = await getDBPool();
		conn = await pool.getConnection();
		// get progress for all users
		const rows = await conn.query('SELECT progress FROM users;');
		// get total number of users
		const userCount = await conn.query('SELECT COUNT(*) FROM users;');
		let count: number = 0;
		for (const row of rows) {
			const progress = row.progress;
			const index = parseInt(stageId) - 1;
			const nthCharacter = progress.charAt(index);
			if (nthCharacter !== '0') {
				count++;
			}
		}
		const userCountInt: number = parseInt(await userCount[0]['COUNT(*)']);
		const percent = (count / userCountInt) * 100;
		res.json(percent);
	} catch (err) {
		res.status(500).send('database error ' + err);
	} finally {
		if (conn) conn.release();
	}
});
export default router;
