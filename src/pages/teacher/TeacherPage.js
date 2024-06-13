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
} from "@mui/material";
import { Circle } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import Api from "../../api/Api";

const TeacherPage = () => {
  const data = useLocation()?.state;
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const result = await Api.getUserData(data.userId);
      setTeacher(result);
    };

    getUser();
  }, []);

  console.log(teacher);

  return (
    <div className="p-4">
      <Grid container spacing={4} className="mt-4">
        {/* Avatar and Basic Info */}
        <Grid item xs={12} md={4}>
          <Paper className="d-flex flex-column align-items-center pt-4 h-100">
            <Avatar
              src={teacher?.userImg}
              alt={teacher?.name}
              sx={{ width: 200, height: 200, mb: 2 }}
            />
            <Typography variant="h5" className="fw-semibold">
              {teacher?.name}
            </Typography>
            <Typography variant="body1">
              <strong>Date of Birth:</strong> {teacher?.birthdate}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {teacher?.email}
            </Typography>
            <Typography variant="body1" className="text-center">
              <strong>School:</strong> {teacher?.university}
            </Typography>
            <Typography variant="body1">
              <strong>TOEIC Score:</strong> {teacher?.score}
            </Typography>
            <div className="d-flex flex-row gap-2 mt-2">
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
          </Paper>
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
                  <Typography variant="body2" className="fw-semibold">
                    ID Card Front
                  </Typography>
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
                  <Typography variant="body2" className="fw-semibold">
                    ID Card Back
                  </Typography>
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
                  <Typography variant="body2" className="fw-semibold">
                    TOEIC Certificate
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Other Certificates */}
        {teacher?.otherCertificate?.length > 0 && (
          <Grid item xs={12}>
            <Paper className="p-4">
              <Typography variant="h6" className="fw-bold">
                Other English Certificates
              </Typography>
              <List>
                {teacher?.otherCertificate?.map((cert, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Circle fontSize="6" className="text-primary" />
                    </ListItemIcon>
                    <ListItemText primary={cert} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        )}

        {/* Other Certificate Images */}
        {teacher?.otherCertificateImages?.length > 0 && (
          <Grid item xs={12}>
            <Paper className="p-4">
              <Typography variant="h6" className="fw-bold">
                Other Certificate Images
              </Typography>
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
            </Paper>
          </Grid>
        )}

        {/* Bank Information */}
        <Grid item xs={12}>
          <Paper className="p-4">
            <Typography variant="h6" className="fw-bold">
              Bank Information
            </Typography>
            <Typography variant="body1">
              <strong>Account Name: </strong>
              {teacher?.bankInformation?.accountName}
            </Typography>
            <Typography variant="body1">
              <strong>Account Number: </strong>
              {teacher?.bankInformation?.accountNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Bank Name: </strong>
              {teacher?.bankInformation?.bankName}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default TeacherPage;
