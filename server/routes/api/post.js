const Post =require('../../models/Posts')

module.exports = (app) => {
    app.post('/api/post/add_one',(req,res)=>{
        
            const { body } = req;
           console.log(body)
        const {UserId,PostText,PostUserName,userphoto} = body;
        const post=new Post({ PostText:PostText,
        UserId:UserId,
        PostUserName:PostUserName,
        userphoto:userphoto,
       })
       post.save((err,Post)=>{
      if(err){
        return   console.error(err);
      }
      else{return res.send(Post)}
    })
    })




    app.get('/api/posts/all', (req, res, next) => {

        Post.find({})
        .then(data=>res.send(data))
        .catch(err=>{
          console.log(err)
        })
      
      });










      //add comment

      app.put("/api/comment/add/:id",(req, res, next) => {
  
        Post.findByIdAndUpdate(
       req.params.id,
       {     comments:req.body.comments}, 
       { new: true }, (err, ProfileImg) => {
         if (err) return res.send(err);
         return res.send(ProfileImg);
       }
     )
   
   })
   app.get('/api/posts/all/:id', (req, res, next) => {

    Post.find({_id:req.params.id})
    .then(data=>res.send(data))
    .catch(err=>{
      console.log(err)
    })
  
  });}