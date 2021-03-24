import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth-context";

export default function User() {
  const [logout, setLogout] = useState(false);
  const auth = useContext(AuthContext);

  if (logout) {
    return <Redirect to="/" />;
  } else {
    return (
      <React.Fragment>
        <h1>USER PAGE</h1>
        <button
          onClick={() => {
            setLogout(true);
            auth.logout();
          }}
        >
          Logout
        </button>
      </React.Fragment>
    );
  }
}
