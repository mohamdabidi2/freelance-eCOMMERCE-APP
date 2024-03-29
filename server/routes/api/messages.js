const Message=require('../../models/messages')
module.exports=(app)=>{
app.post("/api/messages/:sender/:recevid",(req,res)=>{

    const message=new Message({senderId:req.params.sender,recevedId:req.params.recevid,messages:req.body.messages})
    message.save((err,message)=>{
        if(err){
          return   console.error(err);
        }
       
        else{res.send({
            success: true,
            message: 'success',
            message:message
          })}
      })

})



app.get("/api/messages/:id",(req,res)=>{
    Message.find({recevedId:req.params.id},(err,data)=>{
      if(err){
        console.log(err
          )
      }
      else{
        res.send(data)
      }
    })
  })
  app.get("/api/Singlemessages/:id",(req,res)=>{
    Message.find({_id:req.params.id},(err,data)=>{
      if(err){
        console.log(err
          )
      }
      else{
        res.send(data)
      }
    })
  })

app.put("/api/messages/:id",(req,res)=>{
    Message.findByIdAndUpdate(
        req.params.id,
        {  messages:req.body.messages   }, 
        { new: true }, (err, message) => {
          if (err) return res.send(err);
          return res.send(message);
        }
       )
})
}