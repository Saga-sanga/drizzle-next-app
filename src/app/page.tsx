import { UserNav } from "@/components/user-nav";
import TodoList from "../components/todolist";
import { serverClient } from "./_trpc/serverClient";

export default async function Home() {
  const todos = await serverClient.todos.getTodos();
  const user = await serverClient.users.getUser({
    email: "reckson@example.com",
  });
  return (
    <>
      <nav className="h-20 px-8 flex items-center justify-end">
        <UserNav user={user} />
      </nav>
      <main className="flex flex-col items-center justify-between p-24">
        <TodoList initalTodos={todos} />
      </main>
    </>
  );
}
