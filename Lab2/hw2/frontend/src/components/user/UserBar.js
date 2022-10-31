import React, { useContext } from "react";
import Login from "./Login";
import Register from "./Register";
import { StateContext } from "../../context";

const Logout = React.lazy(() => import('./Logout'))

export default function UserBar() {
  const { state } = useContext(StateContext);
  if (state.user) {
    return (
      <div class="form-group">
        <br />
        <Logout />
        <br />
      </div>
    );
  } else {
    return (
      <div class="form-group">
        <br />
        <h4>Login</h4>
        <Login />
        <h4>Register New User</h4>
        <Register />
        <br />
      </div>
    );
  }
}
