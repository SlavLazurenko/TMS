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

  async addParticipant(...username) {
    if (this.status == "pending") {
      if (this.participants.length < this.maxParticipants) {
        const result = await Datastore.event.addParticipant(this.id, ...username);
        if (result.ok == 1) {
          this.participants = result.participants;
          return 'SUCCESS';
        }
        else {
          //update failed
          return 'DB_FAIL';
        }
      }
      else {
        //participant list is already full
        return 'LIST_FULL';
      }
    }
    else {
      //event already started
      return 'ALREADY_STARTED';
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

    // TECHNICAL WIN FOR MATCHES WITH 1 PARTICIPANT
    for (i = 0; i < minMatches; i++) {
      if (checkTD(this.matches[i])) {
        this.advanceNext(this.matches[i].id);
      }
    }

    Datastore.match.add(this.id , ...this.matches)
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
    if ((match.competitors.includes(username) && match.status != "completed") || username == this.admin) {
      match.submissions[username] = [res1, res2];
      this.updateResult(matchId);
      this.advanceNext(matchId);

      const result = await Datastore.match.update(this.id, matchId, match);
      if (result.count > 0) {
        return "SUCCESS";
      }
      else {
        console.log(result);
        return "DB_FAIL";
      }
      return "SUCCESS";
    }
    else {
      return "NOT_AUTHORIZED";
    }
  }

  updateResult(matchId) {
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

  async advanceNext(matchId) {
    const nextMatchId = Math.ceil((matchId + 1 + this.matches.length) / 2);

    if (nextMatchId > this.matches.length) {
      // TODO: final complete
    }
    else {
      await this.updateMatch(nextMatchId);
    }
  }

  async updateMatch(matchId) {
    const firstChildId = matchId - (this.matches.length - matchId) - 1;
    const secondChildId = firstChildId - 1;

    const thisMatch = this.matches[matchId - 1];
    const firstChildIndex = firstChildId - 1;
    const secondChildIndex = secondChildId - 1;
    
    if (secondChildId > 0 && thisMatch.status == "scheduled") {
      await Promise.all([this.updateMatch(firstChildId), this.updateMatch(secondChildId)]);

      const firstChild = this.matches[firstChildIndex];
      const secondChild = this.matches[secondChildIndex];

      if (firstChild.status == "completed") {
        thisMatch.competitors[1] = getWinner(firstChild);
      }
      if (secondChild.status == "completed") {
        thisMatch.competitors[0] = getWinner(secondChild);
      }

      if (firstChild.status == "completed" && secondChild.status == "completed") {
        if (!checkTD(thisMatch)) {
          thisMatch.status = "inProgress";
        }
        else {
          //call update on parent match
          await this.advanceNext(matchId);
        }
      }
      else {
        thisMatch.status = "scheduled";
      }

      await Datastore.match.update(this.id, matchId, thisMatch);

    }

  }

}

module.exports = Event;

function getWinner(match) {
  if (match.result[0] > match.result[1]) {
    return match.competitors[0];
  }
  else if (match.result[0] < match.result[1]) {
    return match.competitors[1];
  }
  else {
    return null;
  }
}

/**
 * Check and set technical defeat
 */
function checkTD(match) {
  if (match.competitors[0] == null) {
    match.result = [0, 3];
    match.status = "completed";
    return true;
  }
  else if (match.competitors[1] == null) {
    match.result = [3, 0];
    match.status = "completed";
    return true;
  }
  return false;
}

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
