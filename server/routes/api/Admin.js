Admin=require('../../models/Admin')
module.exports=(app)=>{

    app.post("/api/admin/add",(req,res)=>{
        const admin=new Admin({...req.body})
        admin.save((err,admin)=>{
            if(err){
              return   console.error(err);
            }
           
            else{res.send({
                success: true,
                message: 'success',
                data:admin
              })}
          })
    })


    app.get("/api/admin/:email/:password",(req,res)=>{
        Admin.find({email:req.params.email,password:req.params.password},(err,admin)=>{
            if(err){
                return   console.error(err);
              }
              if (admin.length != 1) {
                  return res.send({
                    success: false,
                    message: 'Error: Invalid'
                  })}
              else{res.send({
                  success: true,
                  message: 'success of login',
                  data:admin
                })}
            })
  
    
    })


    //get spesific admin
    app.get("/api/admin/:id",(req,res)=>{
        Admin.find({_id:req.params.id},(err,admin)=>{
            if(err){
                return   console.error(err);
              }
              if (admin) {
                  return res.send(admin)}})})
}