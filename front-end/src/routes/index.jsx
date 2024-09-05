import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Layout from "../pages/Layout/Layout";
import Login from "../pages/Login/Login";
import Signup from "../pages/userRegister/Signup";

const Private = ({ Item }) => {
    const signed = useAuth();
    return (signed.signed == true ? <Item /> : <Login />);
};

const DifRoutes = ({ Item }) => {
    const signed = useAuth();
    return (signed.signed == true ? <Item /> : <Login />);
};

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/dashboard" element={<Private Item={Layout} />} />
                    {/* <Route exact path="/Layout" element={<Dashboard/>}/> */}
                    <Route path="/" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    {/* <Route exact path="/company" element={<Company />} /> */}
                    <Route path="*" element={<DifRoutes Item={Layout} />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}

export default RoutesApp;