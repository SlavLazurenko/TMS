import React, { useState, useEffect } from "react";
import axios from "../axiosConfig.js";
import "../css/Profile.css";

const states = {
  LOADING: "loading",
  SET: "set",
  NOT_FOUND: "not_found",
  ERROR: "error"
}

function Profile(props) {

  const username = props.match.params.username;

  const [status, setStatus] = useState(states.LOADING);

  const [accData, setAccData] = useState({
    // tag: "Slav",
    // email: "vlaaurenko22@gmail.com",
    // discordTag: "I_SlavKing_I#7837",
    // avatar: "/img/avatar/default-user-red.png"
  });
  const [teams, setTeams] = useState([
    {
      tag: "Power Rangers",
      role: "owner"
    },
    {
      tag: "Black Eagle",
      role: "member"
    },
    {
      tag: "Good boys",
      role: "member"
    }
  ]);

  useEffect(() => {
    axios.get(`http://localhost:3001/get-user/${username}`)
    .then(res => {
      // console.log("Hello", res.status, res.data);
      setAccData(res.data.account);
      setTeams(res.data.teams);
      setStatus(states.SET);
    })
    .catch(err => {
      // console.log(err);
      // console.log(err.response.status, err.response.data);
      if (err.response.status === 404) {
        setStatus(states.NOT_FOUND);
      }
      else {
        setStatus(states.ERROR);
      }
      
    });
  }, [username]);

  if (status === states.NOT_FOUND) {
    return (
      <div className="profile">
        Player not found
      </div>
    )
  }
  else if (status === states.ERROR) {
    return (
      <div className="profile">
        Error
      </div>
    )
  }
  else {
    return (
      <div className="profile">
        <div className="info-block account">
          <h2 className="block-name">Account Information</h2>
          <AccountBlock status={status} accountData={accData} />
        </div>
        <div className="info-block team">
          <h2 className="block-name">Teams</h2>
          <TeamBlock status={status} teams={teams} />
        </div>
      </div>
    );
  }

}

const AccountBlock = (props) => {
  const {accountData, status} = props;
  if (status === states.SET) {
    return (
      <div className="block">
        <div className="main">
          <img className="avatar" src={accountData.avatar || "/img/avatar/default-user-red.png"} alt="user avatar" />
          <h3 className="username">{accountData.tag}</h3>
        </div>
        <table className="info">
          <tbody>
            { accountData.email && 
            <tr>
              <td className="field">Email:</td>
              <td className="value">{accountData.email}</td>
            </tr>
            }
            <tr>
              <td className="field">Discord tag:</td>
              <td className="value">{accountData.discordTag || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  else if (status === states.LOADING) {
    return (
      <div className="block">
        <div className="loading">
          Loading...
        </div>
      </div>
    )
  } 
}

const TeamBlock = (props) => {
  const {status, teams} = props;
  if (status === states.SET) {
    return (
      <div className="block">
        <ul className="team-list">
          {teams.map((team, index) => {
            return (
              <li className="team-entry" key={index}>
                <img className="logo" src={team.logo || "/img/team-logo/default-team.png"} alt="team logo" />
                <div className="info">
                  <span className="name">{team.tag}</span>
                  <span className="role">{team.role}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
  else if (status === states.LOADING) {
    return (
      <div className="block">
        <div className="loading">
          Loading...
        </div>
      </div>
    );
  }
}

export default Profile;