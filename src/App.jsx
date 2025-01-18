import { Home } from "./pages/home";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FlipRush } from "./component/FlipRush";
import { MineSweep } from "./component/MineSweep";
import { WhackAMole } from "./component/WhackMole";

export default function App() {
 return <>
 
 <BrowserRouter>
 <Routes>
  <Route path= "/" element={<Home/>}/>
  <Route path= "/fliprush" element={<FlipRush/>}/>
  <Route path= "/whackAmole" element={<WhackAMole/>}/>
  
 </Routes>
 </BrowserRouter>
 </>
}