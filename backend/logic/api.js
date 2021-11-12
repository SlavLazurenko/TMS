
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
    static async getEvents(filter, maxNum){
        console.log("Getting maxNum of events using filters.")
        return 
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
        console.log("Getting user by tag.")
        return
        
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
        console.log("Registering new user with userData.")
        return
    }

    /**
     * Handles event registration
     * @param {Object} eventData fields used to register new event
     * @returns {message} success or fail message 
     */
    static async registerEvent(eventData){
        console.log("Registering new event with eventData.")
        return
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
        console.log("Verifying if user is authenticated.")
        return
    }
}

module.exports = Api;