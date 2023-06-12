const express= require('express');
const route= express.Router()
const controller = require ('../controller/controller');
const users_model = require("../models/User")


route.get("/", (req, res) => {
    res.render("homepage");
  });
  
  route.get('/Contact', (req,res) => {
    res.render('Contact')
  })
  
  route.get('/Pricing', (req,res) => {
    res.render('Pricing')
  })
  
  route.get('/products', (req,res) => {
    res.render('products')
  })

  route.get('/register', (req,res) => {
    res.render('register')
  })

  route.post('/register', async (req,res) => {
    console.log(req.body.username)
    console.log(req.body.email)
    console.log(req.body.password)

    let userObj = req.body;
    let user = new users_model(userObj);
    await user.save();
    res.send('succesful')

    // res.send("ok")
  })

  
  route.get('/login', (req,res) => {
    res.render('login')
  })

  

  route.post('/login', async (req,res) => {
    let user = await users_model.findOne({ email: req.body.email });
    if (!user) {
      console.log("not found")
      return res.redirect("/login");
    }
    if (req.body.password == user.password) {
      console.log("successful")
      return res.redirect("/");
    }
    else {
      console.log("invalid pass")
      return res.redirect('/login')
    }
  })
  
  route.get('/add-user', (req,res) => {
    res.render('add_user')
  })

  
  route.get('/update-user', (req,res) => {
    res.render('update_user')
  })

  module.exports= route



const services = require('../services/render');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)


// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

route.post('/api/user', (req, res) => {
    
    res.send('User created successfully');
  });
  
  route.get('/api/user', (req, res) => {
  
    res.send('User data retrieved successfully');
  });
  


module.exports = route