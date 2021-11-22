const bcrypt = require('bcrypt')
const datastore = require('./datastore')
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
            const user = {username: req.body.name, password: hashedPassword}
           await datastore.account.add(user)
           return true;
          }catch{
            return false;
          }
    }
    /**
     * 
     * @param {Object} username 
     * @param {Object} password 
     * @returns the user if found or send a message otherwise 
     */
    async validateCredentials(username,password){
        const user = await datastore.account.find()
        if(user == null) {
           return 
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








