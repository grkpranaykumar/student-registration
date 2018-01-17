var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds257627.mlab.com:57627/students',{
  useMongoClient:true
});

var studentSchema=new mongoose.Schema({
  name:String,
  father:String,
  dob:String,
  email:String,
  address:String,
  college:String,
  mobile:String
});
var Students=mongoose.model('Students',studentSchema);

var urlencodedParser=bodyParser.urlencoded({extended:false});


//Controller
module.exports=function(app){

  app.get('/',function(req,res){
    res.render('index');
  });

  app.get('/contact',function(req,res){
     res.render('contact',{qs:req.query});
   });

  app.post('/contact',urlencodedParser,function(req,res){
    var newStudent=Students(req.body).save(function(err,data){
      if(err) throw err;
      res.render('contact_success',{data:req.body});
    });
  });

  app.get('/display',function(req,res){
    Students.find({}).exec(function(err,data){
      if(err)
        throw err;
      res.render('display',{item:data});
    });
  });

  app.get('/edit_contact/:id',function(req,res){
    Students.findOne({_id:req.params.id}).exec(function(err,data){
      if(err){
        throw err;
      }
      res.render('edit_contact',{qs:data});
    });
  });

  app.get('/view_contact/:id',function(req,res){
    Students.findOne({_id:req.params.id}).exec(function(err,data){
        if(err) throw err;
        res.render('view_contact',{qs:data});
    });
  });

  app.post('/edit_contact/:id',urlencodedParser,function(req,res){
    Students.findByIdAndUpdate(req.params.id,
      {$set:{
        name:req.body.name,
        father:req.body.father,
        dob:req.body.dob,
        email:req.body.email,
        address:req.body.address,
        college:req.body.college,
        mobile:req.body.mobile
      }}
      ,{new:true},function(err,data){
        if(err){
          res.render('edit_contact',{qs:data});
        }
        res.render('update_success',{data:req.body});
      });
  });

  app.post('/delete/:id',function(req,res){
    Students.remove({_id:req.params.id},function(err){
      if(err) throw err;
      res.redirect('/display');
    });
  });

  app.post('/mass_delete',urlencodedParser,function(req,res){
    // for(var i=0;i<req.body.length;i++){
    //   console.log(req.body[i]);
    //   Students.remove({_id:req.body[i]},function(err,data){
    //     if(err) throw err;
    //     res.redirect('/display');
    //   });
    // }
    var ids=[];
    for(var key in req.body){
      //console.log("key",req.body[key]);
      ids=req.body[key];
      // Students.remove({_id:req.body[key]},function(err){
      //   if(err) throw err;
      //   res.redirect('/display');
      // });
    }
    //console.log(ids);
    Students.remove({_id:{$in:ids}},function(err){
      if(err) throw err;
      res.redirect('/display');
    });
  });

};
