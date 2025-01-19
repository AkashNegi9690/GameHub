import { Home } from "./pages/home";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FlipRush } from "./component/FlipRush";
import { Quizio } from "./component/Quizio";
import { WhackAMole } from "./component/WhackMole";
import { MythologyQuiz } from "./component/mythologyquiz";

export default function App() {
 return <>
 
 <BrowserRouter>
 <Routes>
  <Route path= "/" element={<Home/>}/>
  <Route path= "/fliprush" element={<FlipRush/>}/>
  <Route path= "/whackAmole" element={<WhackAMole/>}/>
  <Route path= "/quizio" element={<Quizio/>}/>
  <Route path= "/mythology" element={<MythologyQuiz/>}/>
 </Routes>
 </BrowserRouter>
 </>
}