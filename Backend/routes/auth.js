const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const passport = require('passport');


const JWT_SECRET = 'Sumitisgood$boy';

// ROUTE 1 : create a user using: POST "/api/auth/createUser" . No login required
router.post('/createUser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    
    body('password','Password must be atleast 6 characters').isLength({ min: 6 }),
], async(req, res)=>{
    let success = false;
    // If there are errors return bad request and the errors
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether with the this email exist already
    try {
    let user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({success, error:" Sorry user with this email already exist"})
    }
    // create a new user
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    })
    const data = {
        user:{
            id:user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);

    success = true;
    res.json({success, authToken});
    // res.json(user);

    // catch errors
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2 :  Authenticate a user using: POST "/api/auth/login" . No login required

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
], async(req, res)=>{
    let success = false;
    // If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //  destructuring use
    const{email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"please try to login with correct credentials"});
        }
            const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false;
            return res.status(400).json({success, error:"please try to login with correct credentials"});

        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success,authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

// ROUTE 3 :  Get logged in user Details: POST "/api/auth/getuser" . login required
router.post('/getuser',fetchuser, async(req, res)=>{

try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}

})

// ROUTE-4-----> Google OAuth SignIn (no login required)
router.get('/google', passport.authenticate('google', {
    scope : ['profile', 'email']
  }))
  
// ROUTE-5-----> Google OAuth Redirect URI (no need to visit...🙂)
router.get('/google/redirect', passport.authenticate('google'), (req, res)=> {
    // res.json(req.user)
    const data={
        user:{
            id:req.user.id
        }
    }
    const token = jwt.sign(data, JWT_SECRET)
    res.redirect(process.env.CLIENT_URL+"/redirect?token="+token)
})

module.exports = router



//  we only made email unique here