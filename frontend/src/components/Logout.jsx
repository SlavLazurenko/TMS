import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies()

function userLogout(){

  cookies.remove('access_token')
}

// dont allow access without token

function Logout() {

  return (
    <div className="Logout">
        <h3>Logout</h3>
        <div>
          <form onSubmit={userLogout}>
          <input type='submit'></input>
          </form>
        </div>
    </div>
  );
}

export default Logout;