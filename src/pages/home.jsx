import { Link } from "react-router-dom";
import fliprushicon from '../assets/fliprush/fliprush.avif'
import whachamole from '../assets/whackamole/whackamole.jpg'
import Navbar from "../component/navbar";
export function Home() {
    return <>
    <Navbar/>
        <div className="flex gap-5 justify-center m-20">
            <Link to="/fliprush" >
                <div className="hover:bg-gray-200 hover:translate-x-1 hover:translate-y-1 transition-all duration-300 rounded-md" >
                    <div className="w-32 h-32">
                        <img src={fliprushicon} alt="" className="w-full h-full object-cover rounded-md " />
                    </div>
                    <div className="text-center w-32">
                        FlipRush
                    </div>
                </div>
            </Link>
            <Link to="/whackAmole" >
                <div className="hover:bg-gray-200 hover:translate-x-1 hover:translate-y-1 transition-all duration-300  rounded-md">
                    <div className="w-32 h-32 ">
                        <img src={whachamole} alt="" className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div className="text-center w-32  rounded-md">
                        Wack A Mole
                    </div>
                </div>
            </Link>
        </div>


    </>
}