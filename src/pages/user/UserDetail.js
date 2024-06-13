import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Chip,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Paper,
  ListItemIcon,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  Table,
  TableRow,
} from "@mui/material";
import { Circle } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import Api from "../../api/Api";

const UserDetail = () => {
  const data = useLocation()?.state;
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  const getCourses = async (classes) => {
    const promise = Promise.all(
      classes.map(async (item) => await Api.getClassData(item))
    );
    const list = await promise;
    setCourses(list);
  };

  useEffect(() => {
    const getUser = async () => {
      const result = await Api.getUserData(data.userId);
      setUser(result);
      getCourses(result.Classes);
    };

    getUser();
  }, []);

  return (
    <div className="p-4">
      <Grid container spacing={4} className="mt-4">
        {/* Avatar and Basic Info */}
        <Grid item xs={12} md={4}>
          <Paper className="d-flex flex-column align-items-center pt-4 h-100">
            <Avatar
              src={user?.userImg}
              alt={user?.name}
              sx={{ width: 200, height: 200, mb: 2 }}
            />
            <Typography variant="h5" className="fw-semibold">
              {user?.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user?.email}
            </Typography>
            <Typography
              variant="body1"
              className="d-flex flex-row gap-2 align-items-center"
            >
              <strong>Current Score:</strong>
              {user?.currentScore}
            </Typography>
            <Typography variant="body1" className="text-center">
              <strong>Expected Exam Date:</strong> {user?.expectedExamDate}
            </Typography>
            <Typography
              variant="body1"
              className="d-flex flex-row gap-2 align-items-center"
            >
              <strong>Target:</strong>
              {user?.targetScore}
            </Typography>
            <div className="d-flex flex-row gap-2 mt-2">
              {user?.skills?.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  className="bg-primary text-white"
                  variant="outlined"
                  size="small"
                />
              ))}
            </div>
          </Paper>
        </Grid>

        {/* ID Card and TOEIC Certificate */}

        <Grid item xs={12} md={8}>
          <Paper className="py-2">
            <Typography variant="h6" className="fw-semibold px-3">
              Classes
            </Typography>
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className="fw-semibold">Title</TableCell>
                    <TableCell align="center" className="fw-semibold">
                      Start date
                    </TableCell>
                    <TableCell align="center" className="fw-semibold">
                      Finish date
                    </TableCell>
                    <TableCell align="right" className="fw-semibold">
                      About skill
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((row) => (
                    <TableRow
                      key={row.classId}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.ClassName}
                      </TableCell>
                      <TableCell align="center">{row.Start_Date}</TableCell>
                      <TableCell align="center">{row.Finish_Date}</TableCell>
                      <TableCell align="right">{row.Skill}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Bank Information */}
        <Grid item xs={12}></Grid>
      </Grid>
    </div>
  );
};
export default UserDetail;
