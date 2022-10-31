import React, { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../../context";

export default function Login() {
  const [username, setUsername] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(StateContext);

  const [user, login] = useResource((username, password) => ({
    url: "/login",
    method: "post",
    data: { email: username, password },
  }));

  useEffect(() => {
    if (user?.data?.user) {
      setLoginFailed(false);
      dispatch({ type: "LOGIN", payload: { username: user.data.user.email } });
    } else if (user && user.error) {
      setLoginFailed(true);
    }
    // eslint-disable-next-line 
  }, [user]);

  return (
    <>
    {loginFailed && <span style={{ color: "red" }}>Invalid username or password</span>}
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login(username, password);
      }}
    >
      <div class="card border-primary mb-3" style={{ "max-width": "35rem" }}>
        <div class="form-group">
          <div id="reg-row">
            <div id="reg-row-item">
              <label class="form-label mt-2">Username</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter username"
                style={{ width: "15rem" }}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                name="login-username"
                id="login-username"
              />
            </div>
            <div id="reg-row-item">
              <label class="form-label mt-2">Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Enter password"
                style={{ width: "15rem" }}
                name="register-password"
                id="register-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
          <div id="reg-row">
            <div id="reg-row-item">
              <button
                type="submit"
                class="btn btn-primary"
                value="Login"
                disabled={username.length === 0 || password.length === 0}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    </>
  );
}
