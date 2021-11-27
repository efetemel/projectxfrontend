import * as Yup from "yup";
import  { AuthenticationRequest } from "../dto/AuthenticationRequest";
import Store from "../redux/Store";
import { loadUser, loginUser } from "../redux/actions/AuthActions";
import {useEffect, useState} from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import {AddProductRequest} from "../dto/AddProductRequest";
import axios from "axios";
import {API_ADD_PRODUCT, API_GET_CATEGORIES, API_GET_PRODUCT, API_UPDATE_PRODUCT} from "../settings/ApiSettings";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {Navigate,useNavigate} from "react-router-dom";
export default function (){


    const [loading,setLoading] = useState(true);
    const [categories,setCategories] = useState([]);

    if (loading == true){
        axios.get(API_GET_CATEGORIES)
            .then((res) => {
                setCategories(res.data)

                setLoading(false)
            })
    }



    const schema = Yup.object().shape({
        name:Yup.string().required("Ürün adı giriniz!"),
        purchasePrice:Yup.string().min(1,"en az 1 tl olabilir").required("Ürün alış fiyatı giriniz"),
        quantity:Yup.number().min(1,"en az 1 adet olabilir").required("Ürün stok adedi giriniz"),
        dividend:Yup.string().min(0).required("Ürün kar payı giriniz"),
        description:Yup.string().required("Ürün açıklaması giriniz"),
        category:Yup.string().required("Ürün kategorisi giriniz"),
        barcode:Yup.string().min(13,"en az 13 karakter olabilir").max(20,"en fazla 20 karakter").required("Ürün barkodu giriniz"),

    })

    const { register, handleSubmit,watch,resetField, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => HandleAddProduct(data);
    const [status,setStatus] = useState("");
    const [quested,setQuested] = useState(false);

    const history = useNavigate();


    const HandleAddProduct = (values) => {
        setStatus("");
        const addRequest = AddProductRequest;

        axios.get(API_GET_PRODUCT + values.barcode)
        .then((res) => {
            console.log(res.data.name,values.name)
            var confirm = window.confirm("Bu ürünü zaten daha önce eklemiştiniz eğer stok eklemek isterseniz tamam a tıklayın.");
            if(confirm){
                history("/add-stock-product/"+ values.barcode);
            }
            else{
                var confirm1 = window.confirm("Bu ürün zaten kaydedilmiş. Eğer devam etmek isterseniz ürün bilgileri girdiğiniz bilgiler ile güncellenecektir. Devam etmek istiyor musunuz?");
                if(confirm1){
                    addRequest.name = values.name;
                    addRequest.barcode = values.barcode.toString();
                    addRequest.dividend = parseFloat(values.dividend);
                    addRequest.purchasePrice = parseFloat(values.purchasePrice);
                    addRequest.category = values.category;
                    addRequest.description = values.description;
                    addRequest.price = priceCalc();
                    setStatus("Ürün güncelleniyor lütfen bekleyiniz!");
                    axios.post(API_UPDATE_PRODUCT,addRequest)
                    .then((res) => {
                        setStatus("Ürün başarıyla güncellendi!");
                        resetField();
                        setQuested(false)
                    })
                    .catch((res) => {
                        setStatus(res.message);
                    })
                }
            }
        })
        .catch((res) => {
            addRequest.name = values.name;
            addRequest.barcode = values.barcode.toString();
            addRequest.dividend = parseFloat(values.dividend);
            addRequest.purchasePrice = parseFloat(values.purchasePrice);
            addRequest.category = values.category;
            addRequest.description = values.description;
            addRequest.quantity = values.quantity;
            addRequest.price = priceCalc();
            setStatus("Ürün ekleniyor lütfen bekleyiniz!");
    
            axios.post(API_ADD_PRODUCT,addRequest)
                .then((res) => {
                    setStatus("Ürün başarıyla eklendi!");
                    resetField();

                    setQuested(false)
                })
                .catch((res) => {
                    setStatus(res.message);
                })
        })
        
    }


    function dividendCalc(){
        var purchasePrice = watch("purchasePrice");
        var dividend = watch("dividend");

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
        var purchasePrice = watch("purchasePrice");
        var dividend = watch("dividend");

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

    function checkBarcode(){
        var barcode = watch("barcode");
        if(barcode != null &&barcode.toString().length >= 13 && barcode.toString().length <= 20 && status == "" && quested == false){
            axios.get(API_GET_PRODUCT + barcode)
            .then((res) => {
                var confirm = window.confirm("Bu ürünü zaten daha önce eklemiştiniz eğer stok eklemek isterseniz tamam a tıklayın.");
                setQuested(true)
                if(confirm){
                    history("/add-stock-product/"+ barcode);
                }
            })
        }
    }

    return(
        <div>
            {checkBarcode()}
            <p>{status}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="">Ürün barkodu</label>
                    <input type="number"   {...register("barcode")} />
                    <label>{errors.barcode?.message}</label>
                </div>
                <div>
                    <label htmlFor="">Ürün adı</label>
                    <input type="text"  {...register("name")} />
                    <label>{errors.name?.message}</label>
                </div>
                <div>
                    <label htmlFor="">Ürün açıklaması</label>
                    <input type="text"  {...register("description")} />
                    <label>{errors.description?.message}</label>
                </div>
                <div>
                    <label htmlFor="">Ürün kategorisi</label>
                    <select {...register("category")}>
                        {
                            categories.map((item,key) => {
                                return <option value={item.name} key={key}>{item.name}</option>
                            })
                        }
                    </select>
                    <label>{errors.category?.message}</label>
                </div>
                <div>
                    <label htmlFor="">Ürün adedi</label>
                    <input type="number" defaultValue="1" min="1"  {...register("quantity")} />
                    <label>{errors.quantity?.message}</label>
                </div>
                <div>
                    <label htmlFor="">Ürün geliş fiyatı</label>
                    <input type="number" defaultValue="1" min="1"  {...register("purchasePrice")} />
                    <label>{errors.purchasePrice?.message}</label>
                </div>
                <div>
                    <label htmlFor="">Ürün kar payı</label>
                    <input type="number" defaultValue="0" min="0"  {...register("dividend")} />
                    <label>{errors.dividend?.message}</label>
                </div>
                <p>Ürün kar payı % <span>{dividendCalc()}</span></p>
                <p>Ürün satış fiyatı <span>{priceCalc()}</span></p>
                <input type="reset" value="Temizle"/><br/>
                <input type="submit" value="Ürün ekle"/>

            </form>

        </div>
    )
}