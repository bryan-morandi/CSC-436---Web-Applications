function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE_TODO":
      const newTodo = {
        title: action.payload.title,
        description: action.payload.description,
        author: action.payload.author,
        dateCreated: action.payload.dateCreated,
        complete: action.payload.complete,
        dateCompleted: action.payload.dateCompleted,
        id: action.payload.id,
      };
      return [newTodo, ...state];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              complete: !todo.complete,
              dateCompleted: !todo.complete
                ? new Date(Date.now()).toLocaleString()
                : "",
            }
          : todo
      );
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todoReducer(state.todos, action),
  };
}
