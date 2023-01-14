import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createBlog } from "../redux/features/blogSlice";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [tags, setTags] = useState(["Travel"]);
  const { error, loading } = useSelector((state) => ({ ...state.blog }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleClick = () => {
    let data = inputRef.current.value;
    if (data !== "") {
      setTags([...tags, data]);
    }
  };

  const handleDelete = (i) => {
    let removed = tags.filter((el, index) => {
      return index !== i;
    });
    setTags(removed);
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  let formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      tags: [],
      imageFile: "",
    },
    onSubmit: (values) => {
      values.tags = tags;
      if (values.title && values.description && values.tags) {
        let updatedBlogData = {
          ...values,
          name: user?.result?.name,
          creator: user?.result?._id,
        };
        dispatch(createBlog({ updatedBlogData, navigate, toast }));
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Container className="mt-5">
        <Typography
          sx={{ fontFamily: "Ubuntu Condensed" }}
          variant="h4"
          gutterBottom
        >
          AddBlog
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              value={formik.values.title}
              onChange={formik.handleChange}
              id="title"
              name="title"
              label="Title"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextareaAutosize
              aria-label="empty textarea"
              value={formik.values.description}
              onChange={formik.handleChange}
              name="description"
              placeholder="Description"
              className="Blog-textarea"
              minRows={6}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={2}>
              <div className="tags-input">
                <Stack direction="row" spacing={1}>
                  {tags.map((el, i) => {
                    return (
                      <Chip
                        key={i}
                        label={`${el}`}
                        variant="outlined"
                        onDelete={() => {
                          handleDelete(i);
                        }}
                      />
                    );
                  })}
                </Stack>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Press enter to add tags"
                />
              </div>
              <Button
                onClick={() => {
                  handleClick();
                }}
                variant="outlined"
                endIcon={<AddIcon />}
              >
                Add
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6.1}>
            <TextField
              required
              value={formik.values.imageFile}
              onChange={formik.handleChange}
              id="imageFile"
              name="imageFile"
              label="Source for image"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6.1}>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<CancelIcon />}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outlined"
                endIcon={<SaveAltIcon />}
              >
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};

export default AddBlog;
