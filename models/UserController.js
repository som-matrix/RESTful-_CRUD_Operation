const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
// bodyParser
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
const User = require("./User");

router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.status(500).send("user already exists");
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(() => res.status(200).send("password is hashed"))
            .catch((err) => console.log(err));
        });
      });
      res.status(200).send(newUser)
    }
  }).catch(err=>console.log(err))
});

router.get("/", (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).send("There was a problem with finding user");
    res.status(200).send(users);
  });
});
module.exports = router;

// Get a single user by id
router.get("/:id",(req,res)=>{

    User.findById(req.params.id,(err,user)=>{
        if(err) res.status(500).send('There was some error')
        if(!user) res.status(404).send('No user found!')
        res.status(200).send(user)
    })
})

// Delete a user from a databse
router.delete("/:id",(req, res)=>{

    User.findByIdAndDelete(req.params.id,(err,user)=>{
        if(err) res.status(500).send('There was some error')
        if(!user) res.status(404).send('No user found')
        res.status(200).send(`User ${user.name} has been removed`)
    })
})

// Update a user from the database

router.put("/:id",(req,res)=>{

    User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,user)=>{
        if(err) res.status(500).send("There was some error")
        if(!user) res.status(404).send('No user found!')
        res.status(200).send(user)
    })
})