const express = require("express")
const mongoose = require("mongoose")

const ChecklistModel = require("../models/checklist")

const router = express.Router()

router.get("/", async (req, res)=>{
    try {
        let checklists = await ChecklistModel.find({})
        res.render("checklists/index", {checklists: checklists})
        res.status(200)
    } catch (error) {
        res.json(error)
        res.status(422)
    }
})

router.post("/", async (req, res)=>{
    let {name} = req.body

    let checklist = new ChecklistModel({
        name: name
    })  // Criamos um novo model de checklist. o parametro name é requerido
    try{
        await checklist.save()  // salvamos o modelo na collection ChecklistCollection
        res.status(200)
        res.json(checklist)
    }catch(error){
        res.status(422)
        res.json(error)
    }
})

router.get("/:id", async (req, res)=>{
    try {
        let checklist = await ChecklistModel.findById(req.params.id)
        res.render("checklists/show.ejs", {checklist: checklist})
        // res.json(checklist)
        res.status(200)
    } catch (error) {
        res.json(error)
        res.status(422)
    }
})
router.post("/:id", (req, res)=>{
    console.log(req.params.id)
    res.send("[POST] O objeto que guarda os parametros é req.params = " + req.params)
})
router.put("/:id", async (req, res)=>{
    let {name} = req.body
    try{
        let checklist = await ChecklistModel.findByIdAndUpdate(req.params.id, {name}, {new:true}) // esse new: true é pra retornar o novo valor já atualizado
        res.json(checklist)
        res.status(200)
    }catch(error){
        console.log(error)
        res.status(422)
    }
})
router.delete("/:id", async (req, res)=>{
    try{
        let checklist = await ChecklistModel.findByIdAndRemove(req.params.id)
        res.json(checklist)
        res.status(200)
    }catch(error){
        console.log(error)
        res.status(422)
    }
})

module.exports = router