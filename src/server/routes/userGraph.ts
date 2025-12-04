import express, { Response } from 'express';
import mariadb from 'mariadb';
const router = express.Router();

const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	password: 'comsc',
	database: 'aiko_db',
});

// Switch case function to determine which data to request
router.get('/', async (req: Request, res: Response) => {
	const inputType = req.query.type as 'year' | 'month' | 'week';
	switch (inputType) {
		case 'year': {
			const yearData = await getUserYearData();
			res.json(yearData);
			break;
		}
		case 'month': {
			const monthData = await getUserMonthData();
			res.json(monthData);
			break;
		}
		case 'week': {
			const weekData = await getUserWeekData();
			res.json(weekData);
			break;
		}
		default:
			res.status(400).send('Invalid type');
	}
});

async function getUserYearData() {
	// return data from database

	let conn;
	try {
		// uses defined pool to get a connection
		conn = await pool.getConnection();

		// SQL query to get the count of users enrolled by month
		const query = `
            SELECT
                DATE_FORMAT(enrolled_at, '%Y-%m') AS month,
                COUNT(*) AS user_count
            FROM users
            WHERE enrolled_at >= DATE_FORMAT(CURRENT_DATE - INTERVAL 1 YEAR, '%Y-01-01')
            GROUP BY DATE_FORMAT(enrolled_at, '%Y-%m')
            ORDER BY month;
		`;

		const result = await conn.query(query);
		// returns the xAxis and yAxis data
		return {
			xAxis: result.map((row) => row.month),
			yAxis: result.map((row) => Number(row.user_count)),
		};
	} catch (err) {
		console.log('database error ' + err);
	} finally {
		if (conn) conn.release();
	}
}

async function getUserWeekData() {
	// return data from database

	let conn;
	try {
		conn = await pool.getConnection();
		const query = `
			SELECT DATE_FORMAT(enrolled_at, '%Y-%m-%d') AS day, COUNT(*) as user_count
			FROM users 
			WHERE enrolled_at >= CURRENT_DATE - INTERVAL 7 DAY
			GROUP BY DATE_FORMAT(enrolled_at, '%Y-%m-%d') 
			ORDER BY day;
		`;

		const result = await conn.query(query);

		return {
			xAxis: result.map((row) => row.day),
			yAxis: result.map((row) => Number(row.user_count)),
		};
	} catch (err) {
		console.log('database error ' + err);
	} finally {
		if (conn) conn.release();
	}
}

async function getUserMonthData() {
	// return data from database
	let conn;
	try {
		conn = await pool.getConnection();
		const query = `
            SELECT
                CONCAT('Week ', FLOOR(DATEDIFF(CURRENT_DATE, DATE(enrolled_at)) / 7) + 1) AS week,
                COUNT(*) AS user_count
            FROM users
            WHERE enrolled_at >= CURRENT_DATE - INTERVAL 28 DAY
            GROUP BY week
            ORDER BY FLOOR(DATEDIFF(CURRENT_DATE, DATE(enrolled_at)) / 7) + 1 ASC;
		`;
		const result = await conn.query(query);

		return {
			xAxis: result.map((row) => row.week),
			yAxis: result.map((row) => Number(row.user_count)),
		};
	} catch (err) {
		console.log('database error ' + err);
	} finally {
		if (conn) conn.release();
	}
}

export default router;
