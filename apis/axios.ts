import axios from "axios";

export const getTodo = async () => {
  const { data } = await axios.get(`http://localhost:4000/todos`);
  return data;
};

export const addTodo = async (newTodo: TodoItem) => {
  await axios.post(`http://localhost:4000/todos`, newTodo);
};

export const deleteTodo = async (todoId: string) => {
  await axios.delete(`http://localhost:4000/todos/${todoId}`);
};

export const contentEditTodo = async (props: TodoItem) => {
  await axios.patch(`http://localhost:4000/todos/${props.id}`, { content: props.content });
};

export const statusEditTodo = async (props: { id: string; status: string }) => {
  await axios.patch(`http://localhost:4000/todos/${props.id}`, { status: props.status === "active" ? "done" : "active" });
};
