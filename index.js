const express=require('express')
const app=express()
const arr=require('./arr')

app.use(express.json())

app.listen(2000, ()=>{
    console.log('Listening port 3000 ')
})


app.get('/',(req,res)=>{
    res.json({message : "Working......"})
})

app.get('/api/all',(req,res)=>{
    res.json(arr)
})

app.post('/api/all',(req,res)=>{
   if(!req.body.email)
   {
        res.status(400)
        return res.json({message:"Email is required"})
   }
   const user=
       {
           id:arr.length+1,
           first_name:req.body.first_name,
           last_name:req.body.last_name,
           email:req.body.email
       }
       arr.push(user)
    res.json(user)
})

app.put('/api/all/:id',(req,res)=>{
    
           let id=req.params.id
           let first_name=req.body.first_name
           let last_name=req.body.last_name
           let email=req.body.email
    
           let index=arr.findIndex((number)=>{
               return (number.id == Number.parseInt(id))
           })
           if(index>=0){
               let std=arr[index]
               std.first_name=first_name
               std.last_name=last_name
               std.email=email
               res.json(std)
           }else{
               res.status(404)
               res.end()
           }
})

app.delete('/api/all/:id',(req,res)=>{
    let id=req.params.id
    let index=arr.findIndex((number)=>{
        return (number.id == Number.parseInt(id))
    })
    if(index>=0){
        let std=arr[index]
        res.json(std)
        arr.splice(index,1)
    }else{
        res.status(404)
    }

})