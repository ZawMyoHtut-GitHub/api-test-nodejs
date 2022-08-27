const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// all
router.get('/',async (req,res)=>{
    // res.send('hello world')
    
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

one
router.get('/:id', getSubscriber, (req,res)=>{
    res.json(res.subscriber)
})

// // create
router.post('/', async (req,res)=>{
    const subscriber = new Subscriber({
        name:req.body.name,
        subscribedToChennel:req.body.subscribedToChennel,
        // subscribeDate:req.body.subscribeDate
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

// // update
router.patch('/:id', getSubscriber, async (req,res)=>{
    if(req.body.name !== null){
        res.subscriber.name = req.body.name
    }

    if(req.body.subscribedToChennel !== null){
        res.subscriber.subscribedToChennel = req.body.subscribedToChennel
    }

    try {
        const updateSubscriber = await res.subscriber.save();
        res.json(updateSubscriber);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

// // delete
router.delete('/:id', getSubscriber, async(req,res)=>{
    try {
        await res.subscriber.remove()
        res.json({message:"Deleted Subscriber"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// // middleware
async function getSubscriber(req,res,next){
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber === null){
            return res.status(404).json({message:'cannot find subscriber'})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

    res.subscriber = subscriber;
    next();
}

module.exports = router