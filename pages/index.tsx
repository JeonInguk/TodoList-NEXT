import { TodoList } from "../components/todoList";
import TodoInput from "../components/todoInput";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>TodoList</title>
      </Head>
      <TodoInput />
      <TodoList />
    </>
  );
}
