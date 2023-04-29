import { contentEditTodo, deleteTodo, getTodo, statusEditTodo } from "@/apis/axios";
import { QueryClient, dehydrate, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import todoList from "../styles/todoList.module.css";

export function TodoList() {
  const queryClient = useQueryClient();
  const [checked, setChecked] = useState("all");

  let { data } = useQuery({ queryKey: ["todos"], queryFn: getTodo });

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const contentEditMutaion = useMutation(contentEditTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const handleEdit = (id: string, status: string) => {
    const promptString = prompt("무엇으로 수정하시겠습니까?");
    if (!promptString || promptString.trim() === "") {
      alert("한글자 이상 입력해주세요!");
    } else {
      contentEditMutaion.mutate({ id, content: promptString, status });
    }
  };

  const statusEditMuation = useMutation(statusEditTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const handleCheked = (id: string, status: string) => {
    statusEditMuation.mutate({ id, status });
  };

  data =
    checked === "all"
      ? data
      : checked === "active"
      ? data.filter((item: TodoItem) => item.status === "active")
      : data.filter((item: TodoItem) => item.status === "done");
  return (
    <>
      <div className={todoList.todoContainer}>
        <div className={todoList.todoButton}>
          <button onClick={() => setChecked("all")} className={todoList.allButton}>
            all
          </button>
          <button onClick={() => setChecked("active")} className={todoList.activeButton}>
            active
          </button>
          <button onClick={() => setChecked("done")} className={todoList.doneButton}>
            done
          </button>
        </div>
        <div className={todoList.todoList}>
          {data?.map((item: TodoItem) => {
            return (
              <div key={item.id} className={todoList.contentContainer}>
                <div className={todoList.content}>{item.status === "active" ? item.content : <del>{item.content}</del>}</div>
                <input
                  type="checkbox"
                  checked={item.status === "done"}
                  onChange={() => handleCheked(item.id, item.status)}
                  className={todoList.checkbox}
                ></input>
                <button onClick={() => handleEdit(item.id, item.status)} className={todoList.editButton}>
                  수정
                </button>
                <button onClick={() => handleDelete(item.id)} className={todoList.deleteButton}>
                  삭제
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["todos"], getTodo);
  return {
    props: {
      dehydrateedState: dehydrate(queryClient),
    },
  };
}
