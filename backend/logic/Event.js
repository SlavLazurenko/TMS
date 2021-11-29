const { event, user } = require('../datastore/');
const Datastore = require('../datastore/');

class Event {
  constructor(id) {
    this.id = -1;
  }

  static async fromId(id) {
    let newEvent = new Event();

    const eventData = await Datastore.event.findById(id);
    if (eventData) {
      newEvent.id = eventData.id;
      newEvent.name = eventData.name;
      newEvent.admin = eventData.admin;
      newEvent.description = eventData.description;
      newEvent.start = eventData.start;
      newEvent.end = eventData.end;
      newEvent.accessibility = eventData.accessibility;
      newEvent.type = eventData.type;
      newEvent.participant = eventData.participant;
      newEvent.discipline = eventData.discipline;
      newEvent.maxParticipants = eventData.maxParticipants;
      newEvent.logo = eventData.logo;
      newEvent.participants = eventData.participants;
      newEvent.matches = eventData.matches;
      newEvent.status = eventData.status;

      return newEvent;
    }
    else {
      return null;
    }
  }

  async initMatches() {
    let matches = [];
    const numStartMatches = this.participants.length / 2;

    const minMatches = Math.pow(2, Math.ceil(Math.log(numStartMatches) / Math.log(2)));
    let matchId = 0;

    for (let i = minMatches; i >= 1; i /= 2) {
      for (let j = 0; j < i; j++) {
        matches.push({
          id: ++matchId,
          status: (i == minMatches) ? "inProgress" : "scheduled",      // statuses: scheduled, inProgress, pending, conflict, completed
          competitors: [],
          result: [null, null],
          submissions: {}
        });
      }
    }

    let participantList = shuffle(this.participants);

    let i = 0;
    participantList.forEach((participant) => {
      matches[i % minMatches].competitors.push(participant);
      i++
    });

    this.matches = matches;

    await Datastore.match.add(this.id , ...this.matches)
    .then(async call => {
      if(call) {
        const change = await Datastore.event.update('status', "inProgress")
        if(change){
          console.log("success")
        }
        else{
          console.log("failure")
        }
        console.log("Matches added")
      }
      else {
        
        console.log("Error: Matches were")
      }
    })

  }

  async addResult(matchId, username, res1, res2) {
    const match = this.matches[matchId - 1];
    if (match.competitors.includes(username) || username == this.admin) {
      match.submissions[username] = [res1, res2];
      this.updateResult(matchId);

      const result = await Datastore.match.update(this.id, matchId, match);
      if (result.count > 0) {
        return "SUCCESS";
      }
      else {
        return "DB_FAIL";
      }
    }
    else {
      return "NOT_AUTHORIZED";
    }
  }

  async updateResult(matchId) {
    const match = this.matches[matchId - 1];
    const sources = Object.keys(match.submissions);
    const numSubmissions = sources.length;
    
    if (numSubmissions < 1) {   // THERE ARE NO SUBMISSIONS
      match.result = [null, null];
      return;
    }

    const adminSubmission = match.submissions[this.admin];
    if (adminSubmission) {      // ADMIN IS ALWAYS RIGHT
      match.result = adminSubmission;
      match.status = "completed";
      return;
    }

    const bothSubmitted = (
      sources.includes(match.competitors[0]) &&
      sources.includes(match.competitors[1])
    );

    if (bothSubmitted) {    // BOTH SUBMITTED
      const submitted = [
        match.submissions[match.competitors[0]],
        match.submissions[match.competitors[1]]
      ];

      const resultsEqual = (
        submitted[0][0] == submitted[1][0] && 
        submitted[0][1] == submitted[1][1]
      );

      if (resultsEqual) {     // SAME RESULTS 
        match.result = submitted[0];
        match.status = "completed";
      }
      else {                  // CONFLICT
        match.result = [null, null];
        match.status = "conflict";
      }
    }
    else {      // ONLY ONE SUBMITTED
      match.result = [null, null];
      match.status = "pending";
    }

  }

}

module.exports = Event;

function shuffle(originalArray) {
  var array = [].concat(originalArray);
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
