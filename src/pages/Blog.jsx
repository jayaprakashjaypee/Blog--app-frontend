import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { particularBlog } from "../redux/features/blogSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import { Chip, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";

const Blog = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => ({ ...state.blog }));
  const { id } = useParams();

  const theme = createTheme({
    typography: {
      fontFamily: ["Ubuntu Condensed"].join(","),
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(particularBlog(id));
    }
  }, [id]);

  return (
    <ThemeProvider theme={theme}>
      <div className="container mt-5">
        <Card className="m-auto" sx={{ maxWidth: 1000 }}>
          <CardHeader
            title={`${blog.name}`}
            subheader={`${moment(blog?.createdAt).fromNow()}`}
          />
          <CardMedia
            className="m-auto"
            sx={{ width: "100%", height: "300px" }}
            component="img"
            height="140"
            image={`${blog.imageFile}`}
            alt="green iguana"
          />
          <Stack className=" mt-3 mx-1" direction="row" spacing={1}>
            {blog.tags &&
              blog.tags.map((el, i) => {
                return <Chip key={i} label={`${el}`} />;
              })}
          </Stack>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`${blog.title}`}
            </Typography>
            <Typography
              sx={{ fontSize: "1rem" }}
              variant="body2"
              color="text.secondary"
            >
              {`${blog.description}`}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default Blog;
