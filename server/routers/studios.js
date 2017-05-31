import express from 'express';
import Studios from '../models/Studios';

const router = express.Router();

router.get('/studios',(req,res,next)=>{
    Studios.find({},(err,data)=>{
        if(err){
            return next(err);
        }
        res.send(data);
    })
});

router.get('/search/studio/:id',(req,res,next)=>{
    let id = req.params.id;
    Studios.find({id:id},(err,data)=>{
        if(err){
            next(err)
        }
        res.send(data);
    })
});

router.post('/addStudio',(req,res,next)=>{
    let studio = new Studios(req.body);
    studio.save((err,data)=>{
        if(err){
            return next(err);
        }
        res.status(201).end();
    })
});

router.delete('/delete/studio/:id', (req, res)=> {
    Studios.findOneAndRemove({id: req.params.id}, (err, data)=> {
        if (err) {
            console.log(err.message);
        }
        res.send("succeed");
    });
});

module.exports = router;
