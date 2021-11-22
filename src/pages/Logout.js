import { Navigate } from "react-router-dom";
import Store from "../redux/Store";
import { logoutUser } from "../redux/actions/AuthActions";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function (){
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        Store.dispatch(logoutUser());
    },[])

    if (user == null){
        return <Navigate to="/login"/>
    }

    return(
        <div>
        </div>
    )
}