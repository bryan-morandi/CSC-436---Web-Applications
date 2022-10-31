import { useContext } from "react";
import { StateContext } from "../../context";

export default function Logout() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  return (
    <form
      style={{ textAlign: "center" }}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
      }}
    >
      <div class="card border-success mb-3" style={{ width: "20rem" }}>
        <h5 style={{ margin: "5px" }}>
          Logged in as:&nbsp;&nbsp; <b>{user}</b>
        </h5>

        <div class="d-flex justify-content-center">
          <button
            type="submit"
            class="btn btn-primary"
            style={{ margin: "5px" }}
          >
            Logout
          </button>
        </div>
      </div>
    </form>
  );
}
