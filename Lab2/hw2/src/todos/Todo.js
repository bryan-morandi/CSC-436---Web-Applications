export default function Todo({ todo, dispatch }) {
  return (
    <div class="d-flex justify-content-center">
      <div class="card border-secondary mb-3" style={{ width: "22rem"}}>
        <div class="card-header">
          <h5>Todo By:&nbsp;&nbsp;&nbsp;{todo.author}</h5>
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
                  check={todo.complete}
                  onChange={() =>
                    dispatch({ type: "TOGGLE_TODO", payload: { id: todo.id } })
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
