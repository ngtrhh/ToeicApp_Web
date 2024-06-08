import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ListeningQuestion from "./pages/ListeningQuestion";
import ReadingQuestion from "./pages/ReadingQuestion";
import SpeakingQuestion from "./pages/SpeakingQuestion";
import DetailQuestion from "./pages/question/DetailQuestion";
import Vocab from "./pages/Vocab";
import VocabPage from "./pages/VocabPage";
import Test from "./pages/Test";
import Forum from "./pages/Forum";
import User from "./pages/User";
import Sidebar from "./components/Sidebar";
import { Box } from "@mui/material";
import WritingQuestion from "./pages/WritingQuestion";

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
              <Route path="/test" exact Component={Test} />
              <Route path="/forum" exact Component={Forum} />
              <Route path="/user" exact Component={User} />
              {/* <Route path="/ReadPdf" exact element={<ReadPdf />} /> */}
              {/*
          
          
          <Route path="/QuestionPage" exact element={< />} />
          <Route path="/Test/:id" exact element={<TestView />} />
          <Route path="/Test/add" exact element={<CreateTest />} /> */}
            </Routes>
          </Box>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
