const Photo=require('../../models/frontphotos')

const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './imagesft');
    },
    filename: function(req, file, cb) {
      cb(null,Math.floor(Math.random()*1000)+file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
  })
module.exports=(app)=>{
    app.post("/api/photos/add", upload.single('img'), (req,res)=>{
let photo=new Photo({img:"http://localhost:8080/"+req.file.path.substr(0,8)+"/"+req.file.path.substr(9,req.file.path.length)})
photo.save((err,data)=>{
    if(err){
        console.log(err)
    }
    else{
        res.send(data)
    }
})
    })
    app.get("/api/photos/all",(req,res)=>{
        Photo.find({})
        .then(data=>res.send(data))
        .catch(err=>{
          console.log(err)
        })
    })

    app.delete("/api/photos/delete/:id",(req,res)=>{
        Photo.findOneAndDelete({_id:req.params.id})
        .then(data=>res.send("photo Was Deleted"))
        .catch(err=>{
          console.log(err)})
    })
    
}