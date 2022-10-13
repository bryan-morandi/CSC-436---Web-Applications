import React, { useState } from "react";

export default function Login({ dispatch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //function handleUsername (evt) { setUsername(evt.target.value) }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN", payload: {username: username} });
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
  );
}
