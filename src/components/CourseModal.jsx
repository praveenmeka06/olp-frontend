import { Button, Modal, TextField, Box, Alert } from "@mui/material";
import CustomInput from "./CustomInput";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import { courseSchema } from "../util/validation";
import { useAxiosInstance } from "../service/axiosInstance";
import Snackbar from "@mui/material/Snackbar";
import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

function CourseModal(props) {
  const { open, handleClose, modalType, course, user } = props;
  const { axiosClient } = useAxiosInstance();
  const classes = useStyles();
  const [openAlert, setOpenAlert] = useState(false);
  const [isEnrolled, setEnrolled] = useState(false);
  let navigate = useNavigate();
  const [alertOptions, setAlertOptions] = useState({
    message: "",
    severity: "",
  });

  //check for already enrolled courses to let know users
  const checkEnrolledCourses = () => {
    return user?.courses.some((obj) => obj._id === course?._id);
  };

  useLayoutEffect(() => {
    const enrol = checkEnrolledCourses();
    setEnrolled(enrol);
  }, []);

  const addHandler = async (values) => {
    try {
      const res = await axiosClient.post("/courses", values);
      if (res?.data?.status == "success") {
        setAlertOptions({
          ...alertOptions,
          message: " New course is registered successfully",
          severity: "success",
        });
        setOpenAlert(true);
        handleClose();
        navigate(0);
      }
    } catch (error) {
      setAlertOptions({
        ...alertOptions,
        message: error.response.data.message,
        severity: "error",
      });
      setOpenAlert(true);
    }
  };

  const updateHandler = async (values) => {
    try {
      const res = await axiosClient.put(`/courses/${course._id}`, values);
      if (res.data.status == "success") {
        setAlertOptions({
          ...alertOptions,
          message: " course is updated successfully",
          severity: "success",
        });
        setOpenAlert(true);
        handleClose();
        navigate(0);
      }
    } catch (error) {
      setAlertOptions({
        ...alertOptions,
        message: error.response.data.message,
        severity: "error",
      });
      setOpenAlert(true);
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await axiosClient.delete(`/courses/${course._id}`);
      if (res.data.status == "success") {
        setAlertOptions({
          ...alertOptions,
          message: " course is deleted successfully",
          severity: "success",
        });
        setOpenAlert(true);
        handleClose();
        navigate(0);
      }
    } catch (error) {
      setAlertOptions({
        ...alertOptions,
        message: error.response.data.message,
        severity: "error",
      });
      setOpenAlert(true);
    }
  };

  const enrollHandler = async () => {
    try {
      const newCourses = [...user.courses, course._id];
      const res = await axiosClient.put(`/users/${user._id}`, {
        courses: newCourses,
      });
      if (res.data.status == "success") {
        setAlertOptions({
          ...alertOptions,
          message: " course is enrolled successfully",
          severity: "success",
        });
        setOpenAlert(true);
        handleClose();
        navigate(0);
      }
    } catch (error) {
      setAlertOptions({
        ...alertOptions,
        message: error.response.data.message,
        severity: "error",
      });
      setOpenAlert(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: !(modalType === "add") ? course?.title : "",
      description: !(modalType === "add") ? course?.description : "",
      price: !(modalType === "add") ? course?.price : 0,
    },
    validationSchema: courseSchema,
    onSubmit: (values) => {
      modalType === "edit" ? updateHandler(values) : addHandler(values);
    },
  });
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={classes.modalStyle}>
        <div>
          <h2 className={classes.text}>
            {modalType === "edit"
              ? "Update Course"
              : modalType === "add"
              ? "Add New Course"
              : modalType === "view"
              ? "View Course"
              : "Delete Course"}
          </h2>
        </div>
        {modalType === "delete" ? (
          <div>Are you sure you want to delete this {course.title} course?</div>
        ) : (
          <div>
            <div className={classes.inputDiv}>
              <div>Title</div>
              <CustomInput
                placeholder="Enter title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                disabled={modalType === "view"}
              />
            </div>
            <div className={classes.inputDiv}>
              <div>Description</div>
              <TextField
                className={classes.input}
                placeholder="Enter description"
                name="description"
                value={formik.values.description}
                multiline={true}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                disabled={modalType === "view"}
              />
            </div>
            <div className={classes.inputDiv}>
              <div>Price</div>
              <CustomInput
                placeholder="Enter Price"
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                disabled={modalType === "view"}
              />
            </div>
          </div>
        )}
        <div className={classes.buttonDiv}>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          {modalType === "view" && (
            <div>
              {isEnrolled ? (
                <div>Enrolled</div>
              ) : (
                <Button variant="contained" onClick={enrollHandler}>
                  Enroll
                </Button>
              )}
            </div>
          )}
          {modalType === "delete" && (
            <Button variant="contained" onClick={deleteHandler}>
              Delete
            </Button>
          )}
          {modalType !== "delete" && modalType !== "view" && (
            <Button variant="contained" onClick={formik.handleSubmit}>
              Submit
            </Button>
          )}
        </div>
        <Snackbar
          open={openAlert}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setOpenAlert(false)}
        >
          <Alert
            severity={alertOptions.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertOptions.message}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
}

const useStyles = makeStyles(() => ({
  modalStyle: {
    boxShadow: 24,
    background: "#fff",
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 600,
    maxHeight: "80%",
    overflow: "scroll",
    display: "block",
  },
  input: {
    width: "300px",
    "& .MuiInputBase-root": {
      margin: "10px 0px",
    },
  },
  inputDiv: {
    margin: "20px 0px",
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0px",
  },
  text: {
    margin: "10px 0px",
    textAlign: "center",
  },
}));

export default CourseModal;
