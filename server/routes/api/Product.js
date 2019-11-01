const  Product = require('../../models/product')
const  User = require('../../models/User')

const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './Products');
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


  module.exports = (app) => {


    // create product
app.post("/api/products/add",upload.single("photos"),(req,res,next)=>{
        const { body } = req;
    const {ProductName,UserId,ProductDescription,qte,category,prix} = body;
    const product=new Product({ ProductName:ProductName,
    UserId:UserId,
    ProductDescription:ProductDescription,
    qte:qte,
    prix:prix,
    photo:"http://localhost:8080/"+req.file.path.substr(0,8)+"/"+req.file.path.substr(9,req.file.path.length),
    category:category,})
product.save((err,product)=>{
  if(err){
    return   console.error(err);
  }
  else{return res.send(product)}
})

    

})
//get all products
app.get('/api/products/all', (req, res, next) => {

  Product.find({})
  .then(data=>res.send(data))
  .catch(err=>{
    console.log(err)
  })

});
//get user products 
app.get('/api/products/all/:UserId', (req, res, next) => {

  Product.find({UserId:req.params.UserId})
  .then(data=>res.send(data))
  .catch(err=>{
    console.log(err)
  })

});



// delete product
app.delete("/api/product/:id",(req,res)=>{
Product.findOneAndDelete({_id:req.params.id})
.then(data=>res.send("Product Was Deleted"))
.catch(err=>{
  console.log(err)})
})





  

  }