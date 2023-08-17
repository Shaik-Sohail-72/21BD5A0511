import React from 'react';
import Home from './Home';
import {Routes, Route,BrowserRouter} from "react-router-dom";
import GetTrain from './GetTrain';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/gettrain" element={ <GetTrain/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
