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
        const result = await Datastore.user.findByTag(tag);

        if (result) {
            delete result._id;
        }
        return result;
    }

    static async getUserTeam(tag) {
        const result = await Datastore.team.findTeamOf(tag);

        return result.map(({_id, ...other}) => other);
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
        let status 

        const response = await Datastore.account.find(username)
        if(response == null){

                let userCollectionData = {tag: userData.username, email: userData.email, discordTag: ""}

                authentication.storeCredentials(userData.username, userData.password)
                Datastore.user.add(userCollectionData)
                status = true
                console.log(`${userData.username} has been added to the database.`)
                
        }
        else{
                    console.log("Error: Username already taken.")
                    status = false
                    
                }
                
        return status

    }

    /**
     * 
     * @param {Object} eventData fields used to register new event
     * @returns {message} success or fail message 
     */
    static async registerEvent(eventData, fileData){

        // add array fields {array} -> adding participants/matches to state with "[]" was storing as string in db
        // add route to file : {logo} -> where will we be calling the picture from?
        
        let count
        await Datastore.event.getCountDocuments()
        .then(res => {count = res})
        .catch(err => {console.log(err)})

        count = count + 1

        let form = {
            id: count,
            admin: eventData.username,
            eventName: eventData.eventName,
            description: eventData.description,
            accessibilityOption: eventData.accessibilityOption,
            bracketOption: eventData.bracketOption,
            numOfParticipants: eventData.numOfParticipants,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            participants: [],
            matches: [],
            logo: "../frontend/public/uploads/"+ fileData.file.name
            
        }
        
        let status

        const response = await Datastore.event.add(form)
        if(response){
            status = true
        }
        else{
            status = false
        }
        return status
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
    
        const response = await authentication.validateCredentials(loginData.username, loginData.password);
        
        if (response) {
            return { username: loginData.username, token: response };
        }
        return false;
    }
}

module.exports = Api;