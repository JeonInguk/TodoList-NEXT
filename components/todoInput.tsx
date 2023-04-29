import { addTodo } from "@/apis/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { v4 } from "uuid";
import todoList from "../styles/todoList.module.css";

export default function TodoInput() {
  const queryClient = useQueryClient();
  const [todo, setTodo] = useState<string>("");
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: TodoItem = {
      id: v4(),
      content: todo,
      status: "active",
    };
    mutation.mutate(newTodo);
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    setTodo("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={todoList.inputForm}>
        <input type="text" placeholder="Todo를 추가하세요." value={todo} onChange={handleTodoChange} className={todoList.inputText}></input>
        <button className={todoList.inputButton}>입력</button>
      </form>
    </>
  );
}
