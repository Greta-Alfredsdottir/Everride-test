// Fil: ./src/routes/userRoutes.ts
import { Router } from 'express';
import { getRecords } from '../controllers/userController.js';
const router = Router();
router.get('/', getRecords);
export const userRoutes = router;
