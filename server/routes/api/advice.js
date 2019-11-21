
const Advice=require('../../models/advice')
module.exports=(app)=>{

    app.post("/api/advices/add",(req,res)=>{
        const advice=new Advice({...req.body})
        advice.save((err,advice)=>{
            if(err){
              return   console.error(err);
            }
           
            else{res.send({
                success: true,
                message: 'success',
                data:advice
              })}
          })
    })


   app.get("/api/advices/all",(req,res)=>{
        Advice.find({},(err,advice)=>{
            if(err){
                return   console.error(err);
              }
              if (advice ) {
                  return res.send(advice)}})})
}