// import express, { Request, Response } from 'express';
// import dotenv from 'dotenv';
// import type { HfInference } from '@huggingface/inference';
//
// dotenv.config();
//
// const router = express.Router();
//
// let hf: HfInference | null = null;
//
// async function getHuggingFaceClient(): Promise<HfInference> {
// 	if (!hf) {
// 		const { HfInference } = await import('@huggingface/inference');
// 		hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
// 	}
// 	return hf;
// }
//
// router.post('/', async (req: Request, res: Response) => {
// 	try {
// 		if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
// 			return res.status(400).json({ error: 'No audio data received' });
// 		}
//
// 		const huggingFace = await getHuggingFaceClient();
//
// 		const transcription = await huggingFace.audioToText({
// 			model: 'openai/whisper-tiny.en',
// 			data: req.body,
// 		});
//
// 		res.json({ text: transcription.text });
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json({ error: 'Transcription failed', details: err });
// 	}
// });
// export default router;