import TodoList from "./_components/todolist";
import { serverClient } from "./_trpc/serverClient";

export default async function Home() {
  const todos = await serverClient.todos.getTodos();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TodoList initalTodos={todos}/>
    </main>
  );
}
