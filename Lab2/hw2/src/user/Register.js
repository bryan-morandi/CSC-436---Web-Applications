import { useState } from "react";

export default function Register({ dispatch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "REGISTER", payload: {username: username} });
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
          </div>
          <div id="reg-row">
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
            <div id="reg-row-item">
              <label class="form-label mt-2">Repeat Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Repeat password"
                style={{ width: "15rem" }}
                name="register-password-repeat"
                id="register-password-repeat"
                value={passwordRepeat}
                onChange={(event) => setPasswordRepeat(event.target.value)}
              />
            </div>
          </div>
          <div id="reg-row">
            <div id="reg-row-item">
              <button
                type="submit"
                class="btn btn-primary"
                value="Register"
                disabled={
                  username.length === 0 ||
                  password.length === 0 ||
                  password !== passwordRepeat
                }
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
