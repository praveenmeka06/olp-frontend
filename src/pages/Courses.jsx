import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import { makeStyles } from "@mui/styles";
import { useAxiosInstance } from "../service/axiosInstance";
import { useAuth } from "../context/useAuth";
import CourseModal from "../components/CourseModal";

function Courses() {
  const classes = useStyles();
  const [courseList, setCourseList] = useState([]);
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const [modalType, setModalType] = useState();
  const { currentUser } = useAuth();
  const { axiosClient } = useAxiosInstance();
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axiosClient.get("/courses");
      if (res?.data?.status == "success") {
        setCourseList(res.data.data);
      }
    } catch (error) {
      console.log(error);
      setCourseList([]);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axiosClient.get("/users/getMe");
      if (res?.data?.status == "success") {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    fetchUser();
  }, []);

  const handleOpenViewModal = (course) => {
    setModalType("view");
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleOpenEditModal = (course) => {
    setModalType("edit");
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleOpenDeleteModal = (course) => {
    setModalType("delete");
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleOpenAddModal = () => {
    setModalType("add");
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedCourse(null);
    setOpen(false);
  };

  return (
    <div className={classes.page}>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className={classes.container}>
          <div>
            <h1 className={classes.text}>Courses List</h1>
          </div>
          <div>
            {currentUser && currentUser.role === "admin" && (
              <div>
                <Button variant="contained" onClick={handleOpenAddModal}>
                  Add New
                </Button>
              </div>
            )}
            <List>
              {courseList.map((item) => (
                <ListItem key={item._id} className={classes.listItem}>
                  <Grid container sx={{ width: "100%" }}>
                    <Grid size={{ xs: 7, md: 8 }}>
                      <ListItemText
                        primary={item.title}
                        secondary={"LKR " + item.price}
                      />
                    </Grid>
                    <Grid size={{ xs: 5, md: 4 }} sx={{ textAlign: "center" }}>
                      {currentUser && currentUser.role === "student" && (
                        <IconButton onClick={() => handleOpenViewModal(item)}>
                          <PreviewIcon />
                        </IconButton>
                      )}
                      {currentUser && currentUser.role === "admin" && (
                        <>
                          <IconButton onClick={() => handleOpenEditModal(item)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleOpenDeleteModal(item)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      )}
      {open && (
        <CourseModal
          open={open}
          handleClose={handleClose}
          course={selectedCourse}
          modalType={modalType}
          user={user}
        />
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    justifyContent: "center",
  },
  container: {
    background: "#fff",
    padding: 20,
    borderRadius: 20,
    margin: 50,
    minWidth: "60%",
    [theme.breakpoints.down("md")]: {
      margin: "50px 10px",
      padding: 10,
      minWidth: "80%",
    },
  },
  button: {
    width: "300px",
  },
  text: {
    margin: "10px 0px",
    textAlign: "center",
  },
  listItem: {
    padding: "8px !important",
  },
}));

export default Courses;
