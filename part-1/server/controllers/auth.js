const bcrypt = require("bcrypt");
const users = [];

module.exports = {
    
    login: (req, res) => {
      console.log('Logging In User')
      // console.log(req.body)
      const {username, password} = req.body;
      // console.log(password);
      
      for (let i = 0; i < users.length; i++) {
        const existingPassword = bcrypt.compareSync(password, users[i].passwordHash);
        // console.log(existingPassword);
        
        if (users[i].username === username && existingPassword === true) {
          console.log("Success!");
          res.status(200).send(users[i])
        } else {
          res.status(400).send("User not found.")
        }
      }
    },
    
    register: (req, res) => {

        const salt = bcrypt.genSaltSync(); // default is 10
        const passwordHash = bcrypt.hashSync(req.body.password,salt);
        
        let userObj = {
          username: req.body.username,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          passwordHash
        }
        
        users.push(userObj)
        res.status(200).send(userObj)
        //console.log('Registering User')
        console.log(users)
    }
}