import { useContext } from "react";
import { StateContext } from "../../context";
import Todo from "./Todo";

export default function TodoList() {
  const { state} = useContext(StateContext);
  const { todos } = state;
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Todos</h1>
      
      <div>
{todos.length === 0 && <h3 style={{ textAlign: "center" }}>No todos found.</h3>}
{todos.length > 0 && todos.map((todo) => <Todo {...todo} key={todo._id} todo={todo} />)}
</div>

    </div>
  );
}
