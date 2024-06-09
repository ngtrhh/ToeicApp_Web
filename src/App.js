import React from "react";
import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import ListeningQuestion from "./pages/ListeningQuestion";
import ReadingQuestion from "./pages/ReadingQuestion";
import SpeakingQuestion from "./pages/SpeakingQuestion";
import WritingQuestion from "./pages/WritingQuestion";
import DetailQuestion from "./pages/question/DetailQuestion";
import Vocab from "./pages/Vocab";
import VocabPage from "./pages/VocabPage";
import Test from "./pages/test/Test";
import TestView from "./pages/test/DetailTest";
import CreateTest from "./pages/test/CreateTest";
import Forum from "./pages/Forum";
import User from "./pages/User";
import ReadPdf from "./pages/ReadPdf";
import Teacher from "./pages/teacher/Teacher";
import TeacherPage from "./pages/TeacherPage";
import Courses from "./pages/teacher/Courses";
import CourseDetail from "./pages/CourseDetail";
import Transaction from "./pages/teacher/Transaction";
const SIDEBAR_WIDTH = 240;

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column w-100 min-vh-100 h-100 overflow-hidden">
        <Navbar />

        <div className="flex-row">
          <Sidebar width={SIDEBAR_WIDTH} />

          <Box
            component="main"
            pl={`${SIDEBAR_WIDTH}px`}
            pt={"64px"}
            flex={1}
            minHeight="100vh"
            overflow="auto"
            sx={{
              backgroundColor: "#f5f5f5",
              transition: (theme) =>
                theme.transitions.create(["width", "margin"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
            }}
          >
            <Routes>
              <Route path="/" exact Component={Home} />
              <Route
                path="/question/listening"
                exact
                Component={ListeningQuestion}
              />
              <Route
                path="/question/reading"
                exact
                Component={ReadingQuestion}
              />
              <Route
                path="/question/speaking"
                exact
                Component={SpeakingQuestion}
              />
              <Route
                path="/question/writing"
                exact
                Component={WritingQuestion}
              />
              <Route path="/question/add" exact Component={DetailQuestion} />
              <Route
                path="/question/:id/edit"
                exact
                Component={DetailQuestion}
              />
              <Route path="/question/:id" exact Component={DetailQuestion} />
              <Route path="/vocabulary" exact Component={Vocab} />
              <Route path="/vocabulary/:id" exact Component={VocabPage} />
              <Route path="/Teacher/:id" exact Component={TeacherPage} />
              <Route path="/test" exact Component={Test} />
              <Route path="/test/:id" exact Component={TestView} />
              <Route path="/test/:id/edit" exact Component={TestView} />
              <Route path="/test/add" exact Component={CreateTest} />
              <Route path="/forum" exact Component={Forum} />
              <Route path="/user" exact Component={User} />
              <Route path="/ReadPdf" exact Component={ReadPdf} />
              <Route path="/teacher" exact Component={Teacher} />
              <Route path="/courses" exact Component={Courses} />
              <Route path="/course/:id" exact Component={CourseDetail} />
              <Route path="/Transaction" exact Component={Transaction} />
            </Routes>
          </Box>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
