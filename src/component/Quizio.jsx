import { Link } from "react-router-dom";
import Navbar from "./navbar";

  


export function Quizio(){
    

    return <>
    <Navbar site="Quizio"/>
    <div className="flex flex-wrap justify-center gap-5 mt-20 mx-7">
    <Link to="/mythology" className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-pink-500 rounded hover:from-blue-600 hover:to-pink-600">
        Mythology
    </Link>
    <Link to="/mythology" className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-pink-500 rounded hover:from-blue-600 hover:to-pink-600">
        History
    </Link>
    <Link to="/mythology" className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-pink-500 rounded hover:from-blue-600 hover:to-pink-600">
       Animals
    </Link>
    <Link to="/mythology" className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-pink-500 rounded hover:from-blue-600 hover:to-pink-600">
       Geography
    </Link>
    </div>
  
    </>
}