import { UserNav } from "@/components/user-nav";
import TodoList from "../components/todolist";
import { serverClient } from "./_trpc/serverClient";

export default async function Home() {
  const todos = await serverClient.todos.getTodos();
  return (
    <>
      <main className="flex flex-col items-center justify-between p-24">
        <TodoList initalTodos={todos} />
      </main>
    </>
  );
}
