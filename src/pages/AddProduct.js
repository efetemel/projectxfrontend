import * as Yup from "yup";
import  { AuthenticationRequest } from "../dto/AuthenticationRequest";
import Store from "../redux/Store";
import { loadUser, loginUser } from "../redux/actions/AuthActions";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import {AddProductRequest} from "../dto/AddProductRequest";
import axios from "axios";
import { API_ADD_PRODUCT } from "../settings/ApiSettings";

export default function (){


    const categories = [
        {
            name:"Anakart"
        },
        {
            name:"Telefon"
        }
    ]

    const initialValues = {
        name:"",
        purchasePrice:1,
        quantity:1,
        dividend:0,
        barcode:"",
        description:"",
        categoryName:categories[0].name
    }

    const [status,setStatus] = useState();


    const [name,setName] = useState();
    const [nameError,setNameError] = useState();

    const [barcode,setBarcode] = useState();
    const [barcodeError,setBarcodeError] = useState();

    const [purchasePrice,setPurchasePrice] = useState(1);
    const [purchasePriceError,setPurchasePriceError] = useState();

    const [quantity,setQuantity] = useState();
    const [quantityError,setQuantityError] = useState();

    const [dividend,setDividend] = useState(0);
    const [dividendError,setDividendError] = useState();

    const [price,setPrice] = useState();
    const [priceError,setPriceError] = useState();

    const [description,setDescription] = useState();
    const [descriptionError,setDescriptionError] = useState();

    const [category,setCategory] = useState();
    const [categoryError,setCategoryError] = useState();

    /*function test(){
        if (purchasePrice != null && purchasePrice != "" && dividend !="" && dividend != null){
            return Math.round(parseFloat(dividend)/parseFloat(purchasePrice)*100);
        }
        else{
            return 0
        }
    }

    function calcPrice(){
        if(dividend != null && dividend != ""){
            return parseFloat(purchasePrice)+parseFloat(dividend);
        }
        else{
            return purchasePrice ? purchasePrice : 0
        }
    }*/

    const HandleAddProduct = (values) => {

        const addRequest = AddProductRequest;

       /* addRequest.name = values.name;
        addRequest.barcode = values.barcode.toString();
        addRequest.dividend = dividend;
        addRequest.purchasePrice = purchasePrice;
        addRequest.categoryName = values.categoryName;
        addRequest.description = values.description;
        addRequest.quantity = values.quantity;
        addRequest.price = calcPrice();*/

        axios.post(API_ADD_PRODUCT,addRequest)
            .then((res) => {
            })
            .err((res) => {
            })
    }

    function CheckBarcode(_barcode){
        setBarcodeError("");
        console.log(_barcode,_barcode.length)
        if (_barcode.length == 13){
            setBarcode(_barcode)
            setBarcodeError("Barkod kontrol ediliyor lütfen bekleyiniz");
        }
        else if(_barcode.length >13 || _barcode.length < 13){
            setBarcodeError("Lütfen geçerli bir barkod giriniz");
        }
    }

    function CalcPurchasePrice(_purchasePrice){
        setPurchasePriceError("");
        setPurchasePrice(_purchasePrice)
        if (_purchasePrice != null && _purchasePrice >= 1){
        }
        else{
            setPurchasePriceError("Lütfen geçerli bir fiyat giriniz")
        }
    }

    function CalcDividend(_dividend){
        setDividendError("");
        setDividend(_dividend)
        if (_dividend != null && _dividend >= 0){
        }
        else{
            setDividendError("Lütfen geçerli bir fiyat giriniz")
        }
    }

    function dividendCalc(){
        if ( purchasePrice != null && purchasePrice >= 1){
            if (dividend != null && dividend >=1){
                return Math.round(parseFloat(dividend) / parseFloat(purchasePrice) * 100);
            }
            else{
                return 0;
            }
        }
        else{
            return 0;
        }
    }

    function priceCalc(){
        if ( purchasePrice != null &&purchasePrice >= 1){
            if (dividend != null && dividend >=1){
                return parseFloat(purchasePrice) + parseFloat(dividend);
            }
            else{
                return parseFloat(purchasePrice);
            }
        }
        else{
            return 0;
        }
    }

    function clearForm(){
        setDividendError("");
        setDividend(0);
        setPurchasePriceError("");
        setPurchasePrice(1);
        setCategory("");
        setQuantity(1);
        setBarcode();
        setName("");
        setStatus("");
        setNameError("");
        setCategoryError("");
        setDescriptionError("");
        setPriceError("");
        setQuantityError("");
    }

    return(
        <div>
           <p>{status}</p>
            <form  onSubmit={(e) => {e.preventDefault();HandleAddProduct()}}>
                <div>
                    <label htmlFor="barcode">Ürün barkodu</label>
                    <input type="number" min="1" value={barcode} required onChange={(e) => {CheckBarcode(e.target.value)}}/>
                    <label htmlFor="">{barcodeError}</label>
                </div>
                <div>
                    <label htmlFor="name">Ürün adı</label>
                    <input type="text" value={name} required onChange={(e) => {setName(e.target.value)}}/>
                    <label htmlFor="">{nameError}</label>
                </div>
                <div>
                    <label htmlFor="name">Ürün açıklaması</label>
                    <input type="text" value={description} required onChange={(e) => {setDescription(e.target.value)}}/>
                    <label htmlFor="">{descriptionError}</label>
                </div>
                <div>
                    <label htmlFor="name">Ürün Kategorisi</label>
                    <select name="" id="" value={category} onChange={(e) => {setCategory(e.target.value)}}>
                        {
                            categories.map((item,key) => {
                                return <option value={item.name} key={key}>{item.name}</option>
                            })
                        }
                    </select>
                    <label htmlFor="">{categoryError}</label>
                </div>
                <div>
                    <label htmlFor="name">Ürün Adedi</label>
                    <input type="number" value={quantity} min="1" required onChange={(e) => {setQuantity(e.target.value)}}/>
                    <label htmlFor="">{quantityError}</label>
                </div>
                <div>
                    <label htmlFor="name">Ürün Geliş Fiyatı</label>
                    <input type="number" value={purchasePrice} min="1" required onChange={(e) => {CalcPurchasePrice(e.target.value)}}/>
                    <label htmlFor="">{purchasePriceError}</label>
                </div>
                <div>
                    <label htmlFor="name">Ürün Kar payı tl</label>
                    <input type="number" value={dividend} min="0" required onChange={(e) => {CalcDividend(e.target.value)}}/>
                    <label htmlFor="">{dividendError}</label>
                </div>
                <p>Ürün kar payı % <span>{dividendCalc()}</span></p>
                <p>Ürün satış fiyatı tl <span>{priceCalc()}</span></p>
                <button onClick={() =>{clearForm()}}>Temizle</button>
                <button>Ürünü ekle</button>
            </form>


        </div>
    )
}