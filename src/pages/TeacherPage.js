import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Avatar, Box, Card, CardMedia, CardContent, List, ListItem, ListItemText } from '@mui/material';
import Api from "../api/Api";
import { useLocation } from "react-router-dom";

const TeacherPage = () => {
    const data = useLocation()?.state;
    const [teacher, setTeacher] = useState(null);
    const getUser = async () => {
      const result = await Api.getUserData(data.userId)
      setTeacher(result);
    };
  
    useEffect(() => {
      getUser();
    }, []);
    // const teacher = {
    //     avatar: 'url-to-avatar-image',
    //     name: 'John Doe',
    //     dob: '01/01/1980',
    //     email: 'john.doe@example.com',
    //     school: 'ABC University',
    //     toeicScore: '900',
    //     idCardFront: 'url-to-id-card-front-image',
    //     idCardBack: 'url-to-id-card-back-image',
    //     toeicCertificate: 'url-to-toeic-certificate-image',
    //     otherCertificates: ['Certificate A', 'Certificate B', 'Certificate C'],
    //     otherCertificateImages: ['url-to-certificate-image-1', 'url-to-certificate-image-2'],
    //     bankInfo: {
    //       accountName: 'John Doe',
    //       accountNumber: '123456789',
    //       bankName: 'XYZ Bank',
    //     },
    //   };
  return (
    <Container>
    <Box sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {/* Avatar and Basic Info */}
        <Grid item xs={12} md={4}>
          <Avatar src={teacher?.userImg} alt={teacher?.name} sx={{ width: 200, height: 200, mb: 2 }} />
          <Typography variant="h5">{teacher?.name}</Typography>
          <Typography variant="body1">Date of Birth: {teacher?.birthdate}</Typography>
          <Typography variant="body1">Email: {teacher?.email}</Typography>
          <Typography variant="body1">School: {teacher?.university}</Typography>
          <Typography variant="body1">TOEIC Score: {teacher?.score}</Typography>
        </Grid>

        {/* ID Card and TOEIC Certificate */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={teacher?.frontIDImage}
                  alt="ID Card Front"
                />
                <CardContent>
                  <Typography variant="body2">ID Card Front</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={teacher?.backIDImage}
                  alt="ID Card Back"
                />
                <CardContent>
                  <Typography variant="body2">ID Card Back</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={teacher?.toeicCertificateImage}
                  alt="TOEIC Certificate"
                />
                <CardContent>
                  <Typography variant="body2">TOEIC Certificate</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Other Certificates */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Other English Certificates</Typography>
        <List>
          {teacher?.otherCertificate?.map((cert, index) => (
            <ListItem key={index}>
              <ListItemText primary={cert} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Other Certificate Images */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Other Certificate Images</Typography>
        <Grid container spacing={2}>
          {teacher?.otherCertificateImages?.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={image}
                  alt={`Certificate ${index + 1}`}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Bank Information */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Bank Information</Typography>
        <Typography variant="body1">Account Name: {teacher?.bankInformation?.accountName}</Typography>
        <Typography variant="body1">Account Number: {teacher?.bankInformation?.accountNumber}</Typography>
        <Typography variant="body1">Bank Name: {teacher?.bankInformation?.bankName}</Typography>
      </Box>
    </Box>
  </Container>
);
};
export default TeacherPage