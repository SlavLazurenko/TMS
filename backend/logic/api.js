const Datastore = require('../datastore/index')
const authentication = require('../authentication')
/**
 * Class for basic api interfacing with endpoints
 * @memberof Logic
 * @class
 */
class Api {

    /**
     * 
     * @param {Object} filter constraints used to filter events
     * @param {number} maxNum of events
     * @returns {Object} list of event objects
     */
    static async getEvents(filter, maxNum){
        console.log("Getting maxNum of events using filters.")
        return 
    }

    /**
     * 
     * @param {number} eventID event ID number
     * @returns {Object} event object
     */
    static async getEvent(eventID){
        console.log("Getting event by ID.")
        return
    }

    /**
     * 
     * @param {number} tag user tag ID
     * @returns {Object} user object
     */
    static async getUser(tag){
        console.log("Getting user by tag.")
        return
        
    }

    /**
     * 
     * @param {number} eventId event ID number
     * @param {number} matchID match ID number
     * @returns {Object} match object
     */
    static async getMatch(eventId, matchID){
        console.log("Getting Match using eventId and matchID.")
        return
    }

    /**
     * 
     * @param {Object} userData fields used to register new user
     * @returns {message} success or fail message
     */
    static async registerUser(userData){
        
        // Removing confirm password until form validation is implemented
        delete userData['confirmpassword']
        
        let username = {username: userData.username}

        Datastore.account.find(username)
        .then(value => {
            if (value == null) {
                
                let userCollectionData = {tag: userData.username, email: userData.email, discordTag: ""}

                authentication.storeCredentials(userData.username, userData.password)
                Datastore.user.add(userCollectionData)
                console.log("user added")

            }
            else{
                console.log("Error: Username already taken.")
                return false
            }
            
        })
        .catch(err => console.log(err))

        return true
    }

    /**
     * 
     * @param {Object} eventData fields used to register new event
     * @returns {message} success or fail message 
     */
    static async registerEvent(eventData){
        console.log("Registering new event with eventData.")
        return
    } 

    /**
     * 
     * @param {Object} teamData fields used to register new team
     * @returns {message} success or fail message
     */
    static async registerTeam(teamData){
        console.log("Registering new team with teamData.")
        return
    }

    /**
     * 
     * @param {number} tag user tag ID
     * @param {Object} newData fields used to update existing user
     * @returns {message} success or fail message
     */

    static async modifyUser(tag, newData){ 
        console.log("Modifying User by tag with newData.")
        return
    }

    /**
     * 
     * @param {number} teamID team ID
     * @param {number} tag user tag ID
     * @returns {message} success or fail message
     */
    static async addTeamMember(teamID, tag){
        console.log("Adding new team memeber with username tag to team with teamID.")
        return
    }
    /**
     * 
     * @returns {string} token 
     */

    static async generateToken(){
        console.log("Generating new token.")
        return
    }
    /**
     * 
     * @param {Object} loginData fields use to add authentication
     * @returns {message} success or fail 
     */
    static async authenticateUser(loginData){  
        console.log("Verifying if user is authenticated.")
        return
    }
}

module.exports = Api;