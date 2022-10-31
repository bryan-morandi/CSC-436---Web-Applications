import { useContext } from "react";
import { StateContext } from "../../context";
import Todo from "./Todo";

export default function TodoList() {
  const { state} = useContext(StateContext);
  const { todos } = state;
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Todos</h1>
      {todos.map((todo) => (
        <Todo {...todo} key={todo.id} todo={todo}  />
      ))}
    </div>
  );
}
