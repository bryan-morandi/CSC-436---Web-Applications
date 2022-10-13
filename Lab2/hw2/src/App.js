import React, { useReducer, useEffect } from "react";
import UserBar from "./components/user/UserBar";
import appReducer from "./Reducers";
import TodoList from "./components/todos/TodoList";
import { v4 as uuidv4 } from "uuid";
import CreateTodo from "./components/todos/CreateTodo";

const intialTodos = [
  {
    title: "Feed the rabbits",
    description: "Fresh greens and hay",
    author: "Bryan",
    dateCreated: new Date(Date.now()).toLocaleString(),
    complete: false,
    dateCompleted: "",
    id: uuidv4(),
  },
  {
    title: "Chew on the baseboards",
    description: "To cause mischief ;)",
    author: "Clifford",
    dateCreated: new Date(Date.now()).toLocaleString(),
    complete: false,
    dateCompleted: "",
    id: uuidv4(),
  },
];

function App({title}) {
  useEffect(() => {
    document.title = title; });
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: intialTodos,
  });

  return (
    <div class="container">
      <div class="row">
        <div class="d-flex justify-content-center">
          <UserBar user={state.user} dispatch={dispatch} />
        </div>
        <br />
        {state.user && (
          <div class="d-flex justify-content-center">
            <CreateTodo
              user={state.user}
              todos={state.todos}
              dispatch={dispatch}
            />
          </div>
        )}

        <TodoList todos={state.todos} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
