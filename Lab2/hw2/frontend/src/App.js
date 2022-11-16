import React from "react";
import { useEffect, useReducer } from "react";
import { useResource } from "react-request-hook";
import UserBar from "./components/user/UserBar";
import appReducer from "./Reducers";
import TodoList from "./components/todos/TodoList";
import CreateTodo from "./components/todos/CreateTodo";
import { StateContext } from "./context";

function App({ title }) {
  useEffect(() => {
    document.title = title;
  });
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  // useEffect(() => {
  //   fetch("/api/todos")
  //   .then((result) => result.json())
  //   .then((todos) => dispatch({ type: "FETCH_TODOS", payload: { todos } }));
  // }, []);

  const [todos, getTodos] = useResource(() => ({
    url: "/todo",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));

  useEffect(() => {
    getTodos();
  }, [state?.user?.access_token]);

  useEffect(() => {
    if (todos && todos.isLoading === false && todos.data) {
      dispatch({ type: "FETCH_TODOS", payload: {todos: todos.data.todos.reverse()}});
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
