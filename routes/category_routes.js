import { CategoryModel } from "../db.js"
import { Router } from "express"


const router = Router()


router.get('/', async (req, res) => res.send(await CategoryModel.find()))


router.get('/:id', async (req, res) => {
    const entry = await CategoryModel.findById(req.params.id).populate("_id")
    if (entry) {
        res.send(entry)
    } else {
        res.status(404).send({ error: 'Not Found' })
    }
})


router.post('/', async (req, res) => {
    try {
        // const cat = await CategoryModel.dindOne({ name: req.body.category})
        const insertedEntry = await CategoryModel.create(req.body)
        // Respond with 201 and the created entry
        res.status(201).send(insertedEntry)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})


router.delete('/:id', async (req, res) => {
    const deletedEntry = await CategoryModel.findByIdAndDelete(req.params.id)
    try {
        if (deletedEntry) {
            res.sendStatus(204)
        } else {
            res.status(404).send({ error: 'Not Found' })
        }
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
    
})

router.put('/:id', async (req, res) => {
    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, ({ new: true }))
        if (updatedCategory) {
            res.send(updatedCategory)
        } else {
            res.status(404).send({ error: 'Not Found' })
        }
    } 
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})


export default router