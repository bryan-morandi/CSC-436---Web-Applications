import React from "react";
import { useEffect, useReducer } from "react";
import { useResource } from "react-request-hook";
import UserBar from "./components/user/UserBar";
import appReducer from "./Reducers";
import TodoList from "./components/todos/TodoList";
import CreateTodo from "./components/todos/CreateTodo";
import { StateContext } from "./context";

function App({title}) {
  useEffect(() => {
    document.title = title; });
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  // useEffect(() => {
  //   fetch("/api/todos")
  //   .then((result) => result.json())
  //   .then((todos) => dispatch({ type: "FETCH_TODOS", payload: { todos } }));
  // }, []);

  const[todos, getTodos] = useResource(() => ({
    url: "/todos",
    method: "get",
  }));

 // eslint-disable-next-line
  useEffect(getTodos, []);

  useEffect(() => {
    if (todos && todos.data) {
      dispatch({ type: "FETCH_TODOS", payload: { todos: todos.data.reverse() } });
    }
  }, [todos]);

  return (
    <div class="container">
      <div class="row">
      <StateContext.Provider value={{ state, dispatch }}>
        <div class="d-flex justify-content-center">
          <UserBar />
        </div>
        <br />
        {state.user && (
          <div class="d-flex justify-content-center">
            <CreateTodo />
          </div>
        )}

        <TodoList />
        </StateContext.Provider>
      </div>
    </div>
  );
}

export default App;
