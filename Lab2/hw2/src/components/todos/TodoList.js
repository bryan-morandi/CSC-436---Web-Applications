import Todo from "./Todo";

export default function TodoList({ todos = [], dispatch }) {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Todos</h1>
      {todos.map((todo) => (
        <Todo {...todo} key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </div>
  );
}
