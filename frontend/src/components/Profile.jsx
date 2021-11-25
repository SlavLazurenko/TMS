import React from "react";
import "../css/Profile.css";

function Profile() {

  return (
    <div className="profile">
      <div className="info-block account">
        <h2 className="block-name">Account Information</h2>
        <div className="block">
          <div className="main">
            <img className="avatar" src="/img/avatar/default-user-red.png" alt="default user avatar" />
            <h3 className="username">Slav</h3>
          </div>
          <table className="info">
            <tr>
              <td className="field">Email:</td>
              <td className="value">vlazurenko22@gmail.com</td>
            </tr>
            <tr>
              <td className="field">Discord tag:</td>
              <td className="value">I_SlavKing_I#7837</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="info-block team">
        <h2 className="block-name">Teams</h2>
        <div className="block">
          <ul className="team-list">
            <li className="team-entry">
              <img className="logo" src="/img/team-logo/default-team.png" alt="default team logo" />
              <div className="info">
                <span className="name">Power Rangers</span>
                <span className="role">Owner</span>
              </div>
            </li>
            <li className="team-entry">
              <img className="logo" src="/img/team-logo/default-team.png" alt="default team logo" />
              <div className="info">
                <span className="name">Black Eagle</span>
                <span className="role">Member</span>
              </div>
            </li>
            <li className="team-entry">
              <img className="logo" src="/img/team-logo/default-team.png" alt="default team logo" />
              <div className="info">
                <span className="name">Good boys</span>
                <span className="role">Member</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;