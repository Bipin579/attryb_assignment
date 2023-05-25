import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
    return <>
        <Routes>
            <Route path="/" element={ <PrivateRoute ><Home/></PrivateRoute>} />
            <Route path="/signup" element={ <Signup/>} />
            <Route path="/login" element={ <Login/>} />
        </Routes>
    </>;
};

export default AllRoutes;
