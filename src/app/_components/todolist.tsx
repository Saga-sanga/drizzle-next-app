"use client";
import { trpc } from "../_trpc/client";

export default function TodoList() {
  const getTodos = trpc.getTodos.useQuery();

  return (
    <div>
      {getTodos?.data?.map((data) => (
        <div key={data}>{data}</div>
      ))}
    </div>
  );
}
