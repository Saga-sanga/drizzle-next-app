"use client";
import { useState } from "react";
import { trpc } from "../_trpc/client";
import { Trash2 as Trash } from "lucide-react";

export default function TodoList() {
  const utils = trpc.useContext();
  const getTodos = trpc.getTodos.useQuery();
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => utils.getTodos.invalidate(),
  });
  const setDone = trpc.setDone.useMutation({
    onSettled: () => utils.getTodos.invalidate(),
  });
  const removeTodo = trpc.removeTodo.useMutation({
    onSettled: () => utils.getTodos.invalidate(),
  });
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (content.length) {
      addTodo.mutate(content);
      setContent("");
    }
  };

  return (
    <div>
      <div className="text-black my-5 text-3xl">
        {/* {JSON.stringify(getTodos.data?.sort((a,b) => a.id - b.id))} */}
        {getTodos?.data
          ?.sort((a, b) => a.id - b.id)
          .map((todo) => (
            <div key={todo.id} className="flex gap-3 items-center">
              <input
                type="checkbox"
                id={`check-${todo.id}`}
                checked={!!todo.done}
                style={{ zoom: 1.5 }}
                onChange={async () =>
                  setDone.mutate({ id: todo.id, done: !todo.done })
                }
              />
              <label
                className={todo.done ? "line-through" : ""}
                htmlFor={`check-${todo.id}`}
              >
                {todo.content}
              </label>
              <button
                className="ml-auto"
                onClick={async () => removeTodo.mutate({ id: todo.id })}
              >
                <Trash className="stroke-red-400 hover:stroke-red-600" />
              </button>
            </div>
          ))}
      </div>
      <div className="flex gap-3 items-center">
        <label htmlFor="content">Todo</label>
        <input
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
          className="text-black flex-grow rounded-md border-gray-300 py-2 px-4 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="text"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-800 text-white rounded-full font-bold py-2 px-4"
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}
