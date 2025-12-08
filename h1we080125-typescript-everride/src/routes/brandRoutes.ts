
import {Router} from 'express';
import {createRecord, deleteRecord, getRecord, getRecords, updateRecord} from '../controllers/brandController.js';

const router = Router();

// Subroutes til /api/cars
router.get('/', getRecords);

router.get('/:id', getRecord);

router.post('/', createRecord);

router.put('/:id', updateRecord);

router.delete('/:id', deleteRecord)

export { router as brandRoutes };




