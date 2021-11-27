import { useState } from "react"
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { API_GET_ALL_CUSTOMER } from "../settings/ApiSettings";
import axios from "axios";

export default function(){

    const [cart,setCart] = useState([]);
    const [customers,setCustomers] = useState();
    const [selectedCustomer,setSelectedCustomer] = useState();

    const [barcode,setBarcode] = useState();
    const [name,setName] = useState();
    const [description,setDescription] = useState();
    const [category,setCategory] = useState();
    const [purchasePrice,setPurchasePrice] = useState();
    const [dividend,setDividend] = useState();
    const [customerType,setCustomerType] = useState("Genel Müşteri");
    const [orderType,setOrderType] = useState();

    const [loading,setLoading] = useState(true);

    if (loading == true){
        axios.get(API_GET_ALL_CUSTOMER)
            .then((res) => {
                setCustomers(res.data)
                setLoading(false)
            })
    }

    if(loading == true){
        return <p>Lütfen Bekleyiniz</p>
    }

    function HandleSellProduct(values){

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


    function checkCustomerOrOrderType(){
        if(customerType === "Genel Müşteri"){
            return <div>
                <label htmlFor="">Ödeme Tipi</label>
                <span>
                    <input type="radio" value="Nakit" checked={orderType === "Nakit"} onChange={(e) => {setOrderType(e.target.value)}} />
                    <label htmlFor="">Nakit</label>
                </span>
                <span>
                    <input type="radio" value="Pos" checked={orderType === "Pos"} onChange={(e) => {setOrderType(e.target.value)}} />
                    <label htmlFor="">Pos</label>
                </span>
            </div>
        }
        else{
            return <div>
                <label htmlFor="">Müşteri seçin</label>
                <select value={selectedCustomer} onChange={(e) => {setSelectedCustomer(e.target.value)}}>
                    <option value="" disabled selected>Müşteri Seçiniz</option>
                    {
                        customers.map((item,key) => {
                            return <option key={key} value={item.firstName +" "+ item.lastName}>{item.firstName +" "+ item.lastName}</option>
                        })
                    }
                </select>
            </div>
        }
    }

    return <div>
        <div>
            <label htmlFor="">Ürün barkodu</label>
            <input type="number" value={barcode} onChange={(e) => {setBarcode(e.target.value)}}  />
        </div>
        <div>
            <label htmlFor="">Ürün adı</label>
            <input type="text" value={name} onChange={(e) => {setName(e.target.name)}} disabled />
        </div>
        <div>
            <label htmlFor="">Ürün açıklaması</label>
            <input type="text" value={description} disabled onChange={(e) => {setDescription(e.target.name)}} disabled />
        </div>
        <div>
            <label htmlFor="">Ürün kategorisi</label>
            <select value={category} disabled onChange={(e) => {setCategory(e.target.value)}}> 
            </select>
        </div>
        <div>
            <label htmlFor="">Müşteri tipi</label>
            <span>
                <input type="radio" value="Genel Müşteri" checked={customerType === "Genel Müşteri"} onChange={(e) => {setCustomerType(e.target.value)}} />
                <label htmlFor="">Genel Müşteri</label>
            </span>
            <span>
                <input type="radio" value="Özel Müşteri" checked={customerType === "Özel Müşteri"} onChange={(e) => {setCustomerType(e.target.value)}} />
                <label htmlFor="">Özel Müşteri</label>
            </span>
            {checkCustomerOrOrderType()}
        </div>
        <div>
            <label htmlFor="">Ürün geliş fiyatı</label>
            <input value={purchasePrice}  onChange={(e) => {setPurchasePrice(e.target.value)}}/> 
        </div>
        <div>
            <label htmlFor="">Ürün kar payı</label>
            <input value={dividend}  onChange={(e) => {setDividend(e.target.value)}}/> 
        </div>
        <p>Ürün kar payı % <span>{dividendCalc()}</span></p>
        <p>Ürün satış fiyatı <span>{priceCalc()}</span></p>
    </div>
}