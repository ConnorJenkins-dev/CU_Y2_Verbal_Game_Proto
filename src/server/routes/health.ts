import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
	res.send('1');
});

router.get('/param', (req: Request, res: Response) => {
	const { param } = req.query;
	if (param === '1') {
		res.send(param);
	} else {
		res.status(400).send('invalid param');
	}
});

export default router;
