import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateTodo({ user, todos, dispatch }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({
          type: "CREATE_TODO",
          payload: {
            title,
            description,
            author: user,
            dateCreated: new Date(Date.now()).toLocaleString(),
            complete: false,
            id: uuidv4(),
          },
        });
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
              Author:&nbsp;&nbsp; <b>{user}</b>
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
