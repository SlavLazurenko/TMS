const { event } = require('../datastore/');
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
          status: "scheduled",      // statuses: scheduled, inProgress, conflict, completed
          competitors: [],
          result: [null, null],
          submissions: []
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

  async getBrackets() {
    const numStartMatches = this.participants.length / 2;
    const minMatches = Math.pow(2, Math.ceil(Math.log(numStartMatches) / Math.log(2)));
    
    let brackets = [];

    let currentIndex = 0;
    for (let i = minMatches; i >= 1; i /= 2) {
      let title = `Round of ${i}`;
      switch (i) {
        case 4:
          title = "Quarterfinal";
          break;
        case 2:
          title = "Semifinal";
          break;
        case 1:
          title = "Final";
          break;
      }
      const round = {
        title: title,
        seeds: []
      }
      for (let j = 0; j < i; j++) {
        round.seeds.push({
          id: this.matches[currentIndex].id,
          teams: [
            { name: this.matches[currentIndex].competitors[0] },
            { name: this.matches[currentIndex].competitors[1] },
          ]
        });
      }
      brackets.push(round);
    }
    
    console.log(brackets);
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
