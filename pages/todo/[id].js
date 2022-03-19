import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { db } from "../../firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import Link from "next/link";

const TodoDetails = ({ todoProps }) => {
  const todo = JSON.parse(todoProps);
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Card
          sx={{ minWidth: 275, maxWidth: 600, boxShadow: 3 }}
          style={{ backgroundColor: "#fafafa" }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {todo.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {todo.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href="/">
              <Button size="small">Back to Home</Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TodoDetails;

export const getStaticPaths = async () => {
  const snapShot = await getDocs(collection(db, "todo"));
  const paths = snapShot.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const docRef = doc(db, "todo", id);
  const docSnap = await getDoc(docRef);

  return {
    props: { todoProps: JSON.stringify(docSnap.data() || null) },
  };
};
