function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return {
        username: action.payload.username,
        access_token: action.payload.access_token,
      };
    case "LOGOUT":
      return null;
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
        username: action.payload.username,
        _id: action.payload._id,
      };
      return [newTodo, ...state];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo._id === action.payload._id
          ? {
              ...todo,
              complete: !todo.complete,
              dateCompleted: !todo.complete
                ? new Date(Date.now()).toLocaleString()
                : "",
            }
          : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo._id !== action.payload.id);
    case "FETCH_TODOS":
      return action.payload.todos;
    case "CLEAR_TODOS":
      return [];
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
