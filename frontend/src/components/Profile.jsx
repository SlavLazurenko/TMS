import React, { useState, useEffect } from "react";
import axios from "../axiosConfig.js";
import "../css/Profile.css";

function Profile(props) {

  const username = props.match.params.username;

  const [accData, setAccData] = useState({
    tag: "Slav",
    email: "vlaaurenko22@gmail.com",
    discordTag: "I_SlavKing_I#7837",
    avatar: "/img/avatar/default-user-red.png"
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
      console.log("Hello", res.status, res.data);
      setAccData(res.data.account);
      setTeams(res.data.teams);
    })
    .catch(err => {
      console.log(err);
      console.log(err.response.status, err.response.data);
    });
  }, [username]);

  return (
    <div className="profile">
      <div className="info-block account">
        <h2 className="block-name">Account Information</h2>
        <div className="block">
          <div className="main">
            <img className="avatar" src={accData.avatar || "/img/avatar/default-user-red.png"} alt="user avatar" />
            <h3 className="username">{accData.tag}</h3>
          </div>
          <table className="info">
            <tbody>
              <tr>
                <td className="field">Email:</td>
                <td className="value">{accData.email || "-"}</td>
              </tr>
              <tr>
                <td className="field">Discord tag:</td>
                <td className="value">{accData.discordTag || "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="info-block team">
        <h2 className="block-name">Teams</h2>
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
      </div>
    </div>
  );
}

export default Profile;