import * as Yup from "yup";
import  { AuthenticationRequest } from "../dto/AuthenticationRequest";
import Store from "../redux/Store";
import { loadUser, loginUser } from "../redux/actions/AuthActions";
import { useState } from "react";

export default function (){

    

    const initialValues = {
        name:"",
        price:1,
        purchasePrice:1,
        quantity:1,
        dividend:0,
        barcode:"",
        description:"",
        categoryName:""
    }

    const [name,setName] = useState("");
    const [price,setPrice] = useState(1);
    const [purchasePrice,setPurchasePrice] = useState(1);
    const [quantity,setQuantity] = useState(1);
    const [dividend,setDividend] = useState(0);
    const [barcode,setBarcode] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");

    const categories = [
        {
            name:"Anakart"
        },
        {
            name:"Telefon"
        }
    ]

    const HandleAddProduct = (values) => {
        console.log(values)
        /*const authRequest = AuthenticationRequest;
        authRequest.email = values.email;
        authRequest.password = values.password;

        //Redux//
        Store.dispatch(loginUser(authRequest))
        Store.dispatch(loadUser())*/
    }

    

    return(
        <div>
            <div>
                <label htmlFor="">Ürün barkodu</label>
                <input type="number" min="1" value={barcode} onChange={(e) => {setBarcode(e.target.value)}}/>
            </div>
        </div>
    )
}