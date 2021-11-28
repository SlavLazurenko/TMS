const Datastore = require('../datastore/index')
const authentication = require('../authentication')

/**
 * Class for basic api interfacing with endpoints
 * @memberof Logic
 * @class
 */
class Api {

    /**
     * Provides list of events that match the filter
     * @param {Object} filter constraints used to filter events
     * @param {number} maxNum of events
     * @returns {Object} list of event objects
     */
    static async getEvents(filter, maxNum) {
        console.log("Getting maxNum of events using filters.")

        //TEST FILE: backend/apiTest.js

        const eventList = await Datastore.event.find({}, {findOne: false});

        const result = eventList.map(event => {
            //TODO: return event, but without participants and matches
            return event;
        });

        return result;
    }

    /**
     * Provides detailed information about specific event
     * @param {number} eventID event ID number
     * @returns {Object} event object
     */
    static async getEvent(eventID){
        console.log("Getting event by ID.")
        return
    }

    /**
     * Provides information about specific user
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
     * Provides information about specific match
     * @param {number} eventId event ID number
     * @param {number} matchID match ID number
     * @returns {Object} match object
     */
    static async getMatch(eventId, matchID){
        console.log("Getting Match using eventId and matchID.")
        return
    }

    /**
     * Handles user registration 
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
     * Handles event registration
     * @param {Object} eventData fields used to register new event
     * @returns {message} success or fail message 
     */
    static async registerEvent(eventData, fileData){


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
            participantType: eventData.participantType,
            discipline: eventData.discipline,
            numOfParticipants: eventData.numOfParticipants,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            participants: [],
            matches: [],
            logo: "../frontend/public/img/event-images/"+ fileData.file.name
            
        }
        
        let status

        const response = await Datastore.event.add(form)
        if(response.count > 0){
            status = true
        }
        else{
            status = false
        }
        return status
    } 

    /**
     * Handles team registration
     * @param {Object} teamData fields used to register new team
     * @returns {message} success or fail message
     */
    static async registerTeam(teamData){
        console.log("Registering new team with teamData.")
        return
    }

    /**
     * Updates user profile with provided data
     * @param {number} tag user tag ID
     * @param {Object} newData fields used to update existing user
     * @returns {message} success or fail message
     */

    static async modifyUser(tag, newData){ 
        console.log("Modifying User by tag with newData.")
        return
    }

    /**
     * Adds a new member to a team
     * @param {number} teamID team ID
     * @param {number} tag user tag ID
     * @returns {message} success or fail message
     */
    static async addTeamMember(teamID, tag){
        console.log("Adding new team memeber with username tag to team with teamID.")
        return
    }
    
    /**
     * Handles login process
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