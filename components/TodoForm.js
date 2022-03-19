import { TextField, Button } from "@mui/material";
import { useEffect, useContext, useRef } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "@firebase/firestore";
import TodoContext from "../utils/todoContext";

const TodoForm = () => {
  const inputAreaRef = useRef();
  const { showAlert, todo, setTodo } = useContext(TodoContext);

  const onSubmit = async () => {
    if (todo?.hasOwnProperty("createdAt")) {
      //update handler
      const docRef = doc(db, "todo", todo.id);
      const todoToUpdate = { ...todo, createdAt: serverTimestamp() };
      updateDoc(docRef, todoToUpdate);
      setTodo({ title: "", description: "" });
      showAlert(
        "success",
        `Todo with id ${docRef.id} was updated successfully`
      );
    } else {
      const collectionRef = collection(db, "todo");
      const docRef = await addDoc(collectionRef, {
        ...todo,
        createdAt: serverTimestamp(),
      });
      setTodo({ title: "", description: "" });
      showAlert(
        "success",
        `Todo with id ${docRef.id} was created successfully`
      );
    }
  };

  useEffect(() => {
    const checkIfClickedOutsideArea = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        setTodo({ title: "", description: "" });
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutsideArea);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutsideArea);
    };
  }, []);

  return (
    <div ref={inputAreaRef}>
      <TextField
        fullWidth
        label="title"
        margin="normal"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <TextField
        fullWidth
        label="description"
        multiline
        maxRows={4}
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>
        {todo.hasOwnProperty("createdAt") ? "Update" : "Add New"}
      </Button>
    </div>
  );
};

export default TodoForm;
