/**
 * Group of websocket methods
 * @namespace Logic
 */

/**
 * @memberof Logic
 * @class
 */
class Websocket {
    static async socket(){
        console.log("Creating websocket.")
    }

    static async connect(){
        console.log("Establishing connection through websocket.")
        
    }

    static async send(){
        console.log("Sending through websocket connection.")
        
    }

    static async recieve(){
        console.log("Receiving from websocket connection.")
        return
    }

    static async close(){
        console.log("Closing websocket connection.")
        return
    }
    /**
     * Provides detailed information about specific event
     * @param {number} eventID event ID number
     * @returns {Object} event object
     */
    static async getEvent(eventID){
        console.log("Getting event.")
        return
    }

    /**
     * Adds user to a participants list of the event
     * @param {number} eventID event ID number 
     * @returns {message} success or fail message 
     */
    static async registerForEvent(eventID, tag){
        console.log("Registering for event.")
        return
    }

    /**
     * Sets match result on behalf of the user
     * @param {Object} result fields used to update match 
     * @returns {message} success or fail message
     */
    static async setMatchResult(result){
        console.log("Setting match result.")
        return
    }

    /**
     * Removes user from event participants list
     * @param {number} eventID event ID number
     * @param {number} tag user tag ID
     * @returns {message} success or fail message
     */
    static async leaveEvent(eventID, tag){
        console.log("Leaving event.")
        return
    }

    /**
     * Removes user from event participants list (available only to the admin)
     * @param {number} eventID event ID number
     * @param {number} tag user ID number
     * @return {message} success or fail message
     */
    static async disqualifyParticipants(eventID, tag){
        console.log("Disqualifying participant.")
        return
    }
}

module.exports = Websocket;