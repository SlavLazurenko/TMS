const bcrypt = require('bcrypt')
/**
 * @memberof DataStore 
 */
class Authentication{

    constructor(){
        this.users = []
    }
    
    
    /**
     * 
     * @param {Object} username 
     * @param {Object} password 
     * @returns information of the user account
     */
    async storeCredentials(username, password){
        try{
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = {name: req.body.name, password: hashedPassword}
           users.push(user)
           res.status(201).send()
          }catch{
            res.status(500).send()
          }
        console.log('The user credentials')
        return 
    }
    /**
     * 
     * @param {Object} username 
     * @param {Object} password 
     * @returns the user if found or send a message otherwise 
     */
    async validateCredentials(username,password){
        const user = users.find(user => user.name = req.body.name)
        if(user == null) {
           return res.status(400).send('Cannot find user')
        }
        try{
            if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Success')
         }else{
           res.send('Not Allowed')
         }
         }catch{
            res.status(500).send()
         }
        console.log('Validation of user credentials')
        return 
    }
    /**
     * 
     * @param {Object} userData the information of the user
     * @returns all the information
     */
    generateToken(userData){
        console.log('Generaters the user token')
        return 
    }
    /**
     * 
     * @param {Object} token the user object
     * @returns the information 
     */
    validateToken(token){
        console.log('Validates the user token')
        return
    }
}








