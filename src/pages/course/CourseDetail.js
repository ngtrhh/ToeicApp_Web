import React, { useState, useEffect } from "react";
import { Grid, Typography, Avatar, Button, Chip, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Api from "../../api/Api";

const CourseDetail = () => {
  const data = useLocation()?.state;
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [teacher, setTeacher] = useState(null);

  const getCourse = async () => {
    const result = await Api.getClassData(data.classId);
    setCourse(result);
    getUser(result.userId);
  };

  const getUser = async (id) => {
    const result = await Api.getUserData(id);
    setTeacher(result);
  };
  console.log(teacher);

  // teacherId
  useEffect(() => {
    getCourse();
  }, []);

  const handleTeacherDetails = () => {
    // Function to navigate to teacher's detail page
    console.log("Navigate to teacher details");
    navigate("/teacher/" + teacher.id, {
      state: { userId: teacher.id },
    });
  };

  return (
    <div className="p-4">
      <div className="d-flex flex-column m-4 gap-4">
        {/* Course Information */}
        <Paper className="d-flex flex-column p-4 ">
          <Typography variant="h4" className="fw-bold" gutterBottom>
            {course?.ClassName}
          </Typography>
          <Typography variant="body1" gutterBottom className="mb-2">
            {course?.Description}
          </Typography>
          <div className="d-flex flex-row pt-3 gap-4">
            {/* Course Details */}
            <div className="w-100">
              <Typography variant="body1">
                <strong>Start Date:</strong> {course?.Start_Date}
              </Typography>
              <Typography variant="body1">
                <strong>End Date:</strong> {course?.Finish_Date}
              </Typography>
              <Typography variant="body1">
                <strong>Maximum Students:</strong> {course?.MaximumStudents}
              </Typography>
              <Typography variant="body1">
                <strong>Skills Taught:</strong> {course?.Skill}
              </Typography>
              <Typography variant="body1">
                <strong>Entry Level:</strong> {course?.baseLevel}
              </Typography>
              <Typography variant="body1">
                <strong>Exit Level:</strong> {course?.Level}
              </Typography>
            </div>

            {/* Fee Information */}
            <div className="w-100">
              <Typography variant="h6" className="fw-semibold">
                Fee Information
              </Typography>
              <Typography variant="body1">
                <strong>Fee Plan:</strong> {course?.PaymentPlan}
              </Typography>
              <Typography variant="body1">
                <strong>Fee:</strong> {course?.Tuition}
              </Typography>
            </div>
          </div>
        </Paper>

        {/* Teacher Information */}
        <Grid item xs={12}>
          <Paper className="p-4">
            <Typography variant="h6" className="fw-semibold mb-3">
              Teacher Information
            </Typography>
            <div className="d-flex flex-row gap-4">
              <Avatar
                src={teacher?.userImg}
                alt={teacher?.name}
                sx={{ width: 120, height: 120 }}
              />
              <div className="d-flex flex-column w-100">
                <Typography variant="body1">
                  <strong>Name:</strong> {teacher?.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Date of Birth:</strong> {teacher?.birthdate}
                </Typography>
                <Typography variant="body1">
                  <strong>TOEIC Score:</strong> {teacher?.score}
                </Typography>
                {teacher?.skills?.length > 0 && (
                  <div className="d-flex flex-row align-items-center gap-2">
                    <Typography variant="body1">
                      <strong>Skills:</strong>
                    </Typography>
                    {teacher?.skills?.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        className="bg-primary text-white"
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </div>
                )}
                <div className="mt-3 align-self-end">
                  <Button
                    variant="contained"
                    className="bg-primary shadow-none"
                    onClick={handleTeacherDetails}
                  >
                    View Teacher Details
                  </Button>
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
      </div>
    </div>
  );
};

export default CourseDetail;
