import { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";

import { StateContext } from "../../context";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // eslint-disable-next-line
  const [dateCreated, setDateCreated] = useState(
    new Date(Date.now()).toLocaleString()
  );
  // eslint-disable-next-line
  const [complete, setComplete] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(false);

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [todo, createTodo] = useResource(({ title, description }) => ({
    url: "/todo",
    method: "post",
    headers: { Authorization: `${state.user.access_token}` },
    data: { title, description },
  }));

  useEffect(() => {
    if (todo?.error) {
      setError(true);
    }
    if (todo.isLoading === false && todo.data) {
      dispatch({
        type: "CREATE_TODO",
        payload: {
          title: todo.data.title,
          description: todo.data.description,
          author: user.username,
          dateCreated: todo.data.dateCreated,
          complete: todo.data.complete,
          _id: todo.data._id,
          username: user.username,
        },
      });
    }
    // eslint-disable-next-line
  }, [todo]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        createTodo({ title, description, author: user, dateCreated, complete });
        //reset the form on submit
        setTitle("");
        setDescription("");
      }}
    >
      <h4 style={{ textAlign: "center" }}>Create New Todo</h4>
      <div class="card border-primary mb-3" style={{ "max-width": "25rem" }}>
        <div id="reg-row">
          <div id="reg-row-item">
            <h5>
              Author:&nbsp;&nbsp; <b>{user.username}</b>
            </h5>
          </div>
        </div>
        <div class="form-group">
          <div id="reg-row">
            <div id="reg-row-item">
              <label class="form-label mt-2">Title</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Title"
                style={{ width: "20rem" }}
                name="create-todo-title"
                id="create-todo-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div id="reg-row">
            <div id="reg-row-item">
              <label class="form-label mt-2">Description</label>
              <textarea
                type="textarea"
                class="form-control"
                placeholder="Enter Description"
                style={{ width: "20rem" }}
                name="create-todo-description"
                id="create-todo-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div id="reg-row">
            <div id="reg-row-item">
              <button
                type="submit"
                class="btn btn-primary"
                value="Create Todo"
                disabled={title.length === 0}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
    </form>
  );
}
