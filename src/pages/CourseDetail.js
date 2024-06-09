import React,{ useState, useEffect }from 'react';
import { Container, Grid, Typography, Box, Card, CardContent, CardMedia, Avatar, Button, List, ListItem, ListItemText, Chip} from '@mui/material';
import { useLocation } from "react-router-dom";
import Api from '../api/Api';
import { useNavigate } from "react-router-dom";
const CourseDetail = () => {
    const data = useLocation()?.state;
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const getCourse = async () => {
      const result = await Api.getClassData(data.classId)
      setCourse(result);
      getUser(result.userId)
    };
    const getUser = async (id) => {
        const result = await Api.getUserData(id)
        setTeacher(result);
      };
    // teacherId
    useEffect(() => {
      getCourse();
    }, []);
//   const course = {
//     name: 'Advanced React Course',
//     description: 'This course covers advanced concepts of React.',
//     startDate: '01/07/2024',
//     endDate: '31/12/2024',
//     maxStudents: '30',
//     skills: 'React, Redux, Hooks',
//     entryLevel: 'Intermediate',
//     exitLevel: 'Advanced',
//     feePlan: 'One-time payment',
//     fee: '$500',
//     teacher: {
//       avatar: 'url-to-avatar-image',  // Thay thế bằng URL thực tế của ảnh đại diện
//       name: 'John Doe',
//       dob: '01/01/1980',
//       skills: ['React', 'JavaScript', 'CSS'],
//       toeicScore: '900'
//     }
//   };

  const handleTeacherDetails = () => {
    // Function to navigate to teacher's detail page
    console.log('Navigate to teacher details');
    navigate("/Teacher/" +  data.teacherId, {
        state: { userId: data.teacherId },
      });
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Course Information */}
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>{course?.ClassName}</Typography>
            <Typography variant="body1" gutterBottom>{course?.Description}</Typography>
          </Grid>
          
          {/* Course Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="body1"><strong>Start Date:</strong> {course?.Start_Date}</Typography>
            <Typography variant="body1"><strong>End Date:</strong> {course?.Finish_Date}</Typography>
            <Typography variant="body1"><strong>Maximum Students:</strong> {course?.MaximumStudents}</Typography>
            <Typography variant="body1"><strong>Skills Taught:</strong> {course?.Skill}</Typography>
            <Typography variant="body1"><strong>Entry Level:</strong> {course?.baseLevel}</Typography>
            <Typography variant="body1"><strong>Exit Level:</strong> {course?.Level}</Typography>
          </Grid>
          
          {/* Fee Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Fee Information</Typography>
            <Typography variant="body1"><strong>Fee Plan:</strong> {course?.PaymentPlan}</Typography>
            <Typography variant="body1"><strong>Fee:</strong> {course?.Tuition}</Typography>
          </Grid>

          {/* Teacher Information */}
          <Grid item xs={12}>
            <Typography variant="h6">Teacher Information</Typography>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
              <Avatar src={teacher?.userImg} alt={teacher?.name} sx={{ width: 60, height: 60, mr: 2 }} />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="body1"><strong>Name:</strong> {teacher?.name}</Typography>
                <Typography variant="body1"><strong>Date of Birth:</strong> {teacher?.birthdate}</Typography>
                <Typography variant="body1"><strong>TOEIC Score:</strong> {teacher?.score}</Typography>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body1"><strong>Skills:</strong></Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {teacher?.skills?.map((skill, index) => (
                      <Chip key={index} label={skill} variant="outlined" />
                    ))}
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" onClick={handleTeacherDetails}>View Teacher Details</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CourseDetail;
