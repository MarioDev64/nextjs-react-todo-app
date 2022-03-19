import { useContext } from "react";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import moment from "moment";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { db } from "../firebase";
import { doc, deleteDoc } from "@firebase/firestore";
import TodoContext from "../utils/todoContext";
import { useRouter } from "next/router";

const Todo = ({ id, title, description, createdAt }) => {
  const { showAlert, setTodo } = useContext(TodoContext);
  const router = useRouter();
  const deleteTodo = async (id, e) => {
    e.stopPropagation();
    const docRef = doc(db, "todo", id);
    await deleteDoc(docRef);
    showAlert("success", `Todo with id ${docRef.id} was deleted successfully`);
  };
  const seeMore = (id, e) => {
    e.stopPropagation();
    router.push(`/todo/${id}`);
  };
  const markAsCompleted = (id, e) => {
    e.stopPropagation();
    let item = document.getElementById(id);
    if (item.attributes["completed"].value === "false") {
      item.style.backgroundColor = "#059862";
      item.attributes["completed"].value = "true";
    } else {
      item.style.backgroundColor = "#FAFAFA";
      item.attributes["completed"].value = "false";
    }
  };
  return (
    <ListItem
      id={id}
      onClick={() => setTodo({ id, title, description, createdAt })}
      completed="false"
      sx={{ mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: "#FAFAFA" }}
      secondaryAction={
        <>
          <IconButton onClick={(e) => deleteTodo(id, e)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={(e) => markAsCompleted(id, e)}>
            <BookmarkBorderIcon />
          </IconButton>
          <IconButton onClick={(e) => seeMore(id, e)}>
            <MoreVertIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={title}
        secondary={moment(createdAt).format("MMMM do, yyyy")}
      ></ListItemText>
    </ListItem>
  );
};

export default Todo;
