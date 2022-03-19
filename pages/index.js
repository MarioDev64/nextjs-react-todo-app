import { useState } from "react";
import { Container, Snackbar, Alert } from "@mui/material";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import TodoContext from "../utils/todoContext";

export default function Home() {
  const [todo, setTodo] = useState({ title: "", description: "" });
  const [open, setOpen] = useState(true);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const showAlert = (type, msg) => {
    setAlertType(type);
    setAlertMessage(msg);
    setOpen(true);
  };
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <TodoContext.Provider value={{ showAlert, todo, setTodo }}>
      <Container maxWidth="sm">
        <TodoForm />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alertType}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
        <TodoList />
      </Container>
    </TodoContext.Provider>
  );
}
