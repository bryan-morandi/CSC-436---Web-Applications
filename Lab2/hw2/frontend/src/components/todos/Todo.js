import { useContext } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../../context";

export default function Todo({todo}) {
  const { state, dispatch } = useContext(StateContext);

  // eslint-disable-next-line
  const [deleteTodo, deleteAction] = useResource((id) => ({
    url: "/todo/" + id,
    method: "delete",
    headers: { Authorization: `${state.user.access_token}` },
  }));

  // eslint-disable-next-line
  const [toggleTodo, toggleAction] = useResource(({id, complete, dateCompleted}) => ({
    url: "/todo/" + id,
    method: "patch",
    headers: { Authorization: `${state.user.access_token}` },
    data: { id, complete, dateCompleted },
  }));

  return (
    <div class="d-flex justify-content-center">
      <div class="card border-secondary mb-3" style={{ width: "22rem" }}>
        <div class="card-header d-flex justify-content-between">
          <h5>By: &nbsp;&nbsp;{todo.username}</h5>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => {
              deleteAction(todo._id);
              dispatch({ type: "DELETE_TODO", payload: { id : todo._id }});
            }
            }
          >
            Delete
          </button>
        </div>
        <div class="card-body">
          <h4 class="card-title">{todo.title}</h4>
          <div class="card-text">
            <h6>{todo.description ? todo.description : null}</h6>
            <p>Created Date: {todo.dateCreated}</p>
            <p>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() =>{
                    toggleAction({id: todo._id, complete : !todo.complete, dateCompleted : new Date(Date.now()).toLocaleString()});
                    dispatch({ type: "TOGGLE_TODO", payload: { _id : todo._id }});
                  }
                  }
                />
                <label class="form-check-label">
                  {todo.complete ? "Completed" : "Not Completed"}
                </label>
              </div>{" "}
            </p>
            {todo.complete ? <p>Completed Date: {todo.dateCompleted} </p> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
