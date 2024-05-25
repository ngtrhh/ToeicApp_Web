import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Questions from "./pages/Questions";
import Vocab from "./pages/Vocab";
import VocabPage from "./pages/VocabPage";
import Test from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column w-100 min-vh-100 h-100 overflow-hidden">
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/Question" exact Component={Questions} />
          <Route path="/Vocab" exact Component={Vocab} />
          <Route path="/Vocab/:id" exact Component={VocabPage} />
          <Route path="/Test" exact Component={Test} />
          {/*
          <Route path="/Forum" exact element={<Forum />} />
          <Route path="/User" exact element={<User />} />
          <Route path="/ReadPdf" exact element={<ReadPdf />} />
          <Route path="/QuestionPage" exact element={<QuestionPage />} />
          <Route path="/Test/:id" exact element={<TestView />} />
          <Route path="/Test/add" exact element={<CreateTest />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
