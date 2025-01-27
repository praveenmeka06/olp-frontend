import {
  Button,
  Modal,
  Box,
  Alert,
  FormControl,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
} from "@mui/material";
import CustomInput from "./CustomInput";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import { studentSchema } from "../util/validation";
import { useAxiosInstance } from "../service/axiosInstance";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentModal(props) {
  const { open, handleClose, modalType, student, allCourses } = props;
  const { axiosClient } = useAxiosInstance();
  const classes = useStyles();
  const [openAlert, setOpenAlert] = useState(false);
  let navigate = useNavigate();
  const [alertOptions, setAlertOptions] = useState({
    message: "",
    severity: "",
  });
  const [enrollCourses, setEnrollCourses] = useState(
    modalType == "add" ? [] : [...student.courses]
  );

  const addHandler = async (values) => {
    try {
      const res = await axiosClient.post("/users", values);
      if (res?.data?.status == "success") {
        setAlertOptions({
          ...alertOptions,
          message: " New student is registered successfully",
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
      const res = await axiosClient.put(`/users/${student._id}`, values);
      if (res.data.status == "success") {
        setAlertOptions({
          ...alertOptions,
          message: " student is updated successfully",
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
      const res = await axiosClient.delete(`/users/${student._id}`);
      if (res.data.status == "success") {
        setAlertOptions({
          ...alertOptions,
          message: "Student is deleted successfully",
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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setEnrollCourses(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleDeleteEnrolledCourse = (value) => {
    setEnrollCourses(enrollCourses.filter((item) => item._id !== value._id));
  };

  const formik = useFormik({
    initialValues: {
      name: !(modalType === "add") ? student?.name : "",
      email: !(modalType === "add") ? student?.email : "",
    },
    validationSchema: studentSchema,
    onSubmit: (values) => {
      const newValues = { ...values, role: "student", courses: enrollCourses };
      modalType === "edit" ? updateHandler(newValues) : addHandler(newValues);
    },
  });
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={classes.modalStyle}>
        <div>
          <h2 className={classes.text}>
            {modalType === "edit"
              ? "Update Student"
              : modalType === "add"
              ? "Add New Student"
              : "Delete Student"}
          </h2>
        </div>
        {modalType === "delete" ? (
          <div>Are you sure you want to delete student {student.name}?</div>
        ) : (
          <div>
            <div className={classes.inputDiv}>
              <div>Name</div>
              <CustomInput
                placeholder="Enter Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </div>
            <div className={classes.inputDiv}>
              <div>Email</div>
              <CustomInput
                placeholder="Enter Email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div>
              <FormControl sx={{ width: 300 }}>
                <div style={{ marginBottom: "10px" }}>Enrolled Courses</div>
                <Select
                  id="demo-multiple-chip"
                  multiple
                  value={enrollCourses}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value._id}
                          label={value.title}
                          onMouseDown={(event) => {
                            event.stopPropagation();
                          }}
                          onDelete={() => handleDeleteEnrolledCourse(value)}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {allCourses.map((course) => (
                    <MenuItem
                      key={course._id}
                      value={course}
                      disabled={enrollCourses.some(
                        (obj) => obj._id === course?._id
                      )}
                    >
                      {course.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        )}
        <div className={classes.buttonDiv}>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          {modalType === "delete" && (
            <Button variant="contained" onClick={() => deleteHandler()}>
              Delete
            </Button>
          )}
          {modalType !== "delete" && (
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

export default StudentModal;
