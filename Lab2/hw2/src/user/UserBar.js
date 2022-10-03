import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

export default function UserBar({ user, dispatch }) {
  if (user) {
    return (
      <div class="form-group">
        <br />
        <Logout user={user} dispatch={dispatch} />
        <br />
      </div>
    );
  } else {
    return (
      <div class="form-group">
        <br />
        <h4>Login</h4>
        <Login dispatch={dispatch} />
        <h4>Register New User</h4>
        <Register dispatch={dispatch} />
        <br />
      </div>
    );
  }
}
