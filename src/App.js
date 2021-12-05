import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useState} from "react";
import Store from "./redux/Store";
import { loadUser } from "./redux/actions/AuthActions";
import { useSelector } from "react-redux";
import { getExpense, getInCome, getNowVault, getReceived } from "./redux/actions/VaultActions";
import Logout from "./pages/Logout";
import AddProduct from "./pages/AddProduct";
import AddStockProduct from "./pages/AddStockProduct";
import StockOfProduct from "./pages/StockOfProduct";
import DellProduct from "./pages/DellProduct";
import SellProduct from "./pages/SellProduct";
import Loading from "./pages/Loading";
import AddCustomer from "./pages/AddCustomer";

export default function App() {

    const { isAuthentication,isLoading,user } = useSelector(state => state.auth);
    const [loading,setLoad] = useState(true);
    const [loading2,setLoad2] = useState(true);
    const [loading3,setLoad3] = useState(true);

    if (loading == true){
        Store.dispatch(loadUser());
        setLoad(false)
    }


    if (loading == false && loading2 == true && user != null){

        Store.dispatch(getExpense());
        Store.dispatch(getInCome());
        Store.dispatch(getReceived());
        Store.dispatch(getNowVault());
        setLoad2(false)
    }





    function routes(){
        if (isAuthentication){
            if (user == null && loading3 == true){
                //ilk defa login oluyorsa
                Store.dispatch(loadUser());
                setLoad3(false)
            }
            return <>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/add-product" element={<AddProduct/>}/>
                <Route exact path="/add-stock-product/:paramBarcode" element={<AddStockProduct/>}/>
                <Route exact path="/stock-of-product" element={<StockOfProduct/>}/>
                <Route exact path="/dell-product" element={<DellProduct/>}/>
                <Route exact path="/sell-product" element={<SellProduct/>}/>
                <Route exact path="/add-customer" element={<AddCustomer/>}/>

            </>
        }
        else{
            return <Route path="*" element={<Loading/>}/>
        }
    }

    return (
        <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/logout" element={<Logout/>}/>
            { routes() }
        </Routes>
    );
}

