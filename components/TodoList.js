import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Todo from "../components/Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "todo");

    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt?.toDate().getTime(),
        }))
      );
    });

    return unsuscribe;
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          createdAt={todo.createdAt}
        />
      ))}
    </div>
  );
};

export default TodoList;
