import { Router } from 'express';
import insertRoutes from './insert.routes.js';

const router = Router();

router.use('/insert', insertRoutes);

export default router;
