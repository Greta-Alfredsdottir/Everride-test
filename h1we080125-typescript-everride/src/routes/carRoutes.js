
import {Router} from 'express';
import {getRecords} from '../controllers/carController.js'

const router = Router()


router.get('/', getRecords)
router.get('/:id', (req, res) =>{
    const id = Number(req.params.id)
    res.send(`Bil detaljer: ${id}`)
});

export { router as carRouter }




