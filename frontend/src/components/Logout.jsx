import React from "react";



// dont allow access without token

function Logout(props) {

  return (
    <div className="Logout">
        <h3>Logout</h3>
        <div>
          <form onSubmit={() => {
            props.unsetAccount();
            props.history.push('/');
          }}>
          <input type='submit'></input>
          </form>
        </div>
    </div>
  );
}

export default Logout;