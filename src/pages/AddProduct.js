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

    const schema = Yup.object().shape({
        name:Yup.string().required("Ürün adı giriniz!"),
        purchasePrice:Yup.number().min(1).required("Ürün alış fiyatı giriniz"),
        quantity:Yup.number().min(1).required("Ürün stok adedi giriniz"),
        dividend:Yup.number().min(0).required("Ürün kar payı giriniz"),
        barcode:Yup.number().required("Ürün barkodu giriniz"),
        description:Yup.string().required("Ürün açıklaması giriniz"),
        categoryName:Yup.string().required("Ürün kategorisi giriniz")
    })

    const [dividend,setDividend] = useState(0);
    const [purchasePrice,setPurchasePrice] = useState(0);


    function test(){
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
    }

    const HandleAddProduct = (values) => {

        const addRequest = AddProductRequest;

        addRequest.name = values.name;
        addRequest.barcode = values.barcode.toString();
        addRequest.dividend = dividend;
        addRequest.purchasePrice = purchasePrice;
        addRequest.categoryName = values.categoryName;
        addRequest.description = values.description;
        addRequest.quantity = values.quantity;
        addRequest.price = calcPrice();

        axios.post(API_ADD_PRODUCT,addRequest)
            .then((res) => {
                console.log(res.data)
            })
            .err((res) => {
                console.log(res.message)
            })
    }

    return(
        <div>
            <Formik initialValues={initialValues} validationSchema={schema} onSubmit={(values) => HandleAddProduct(values)}>
                <Form>
                    <div className=" mb-4">
                        <div className="form-group first rounded-3 bg-white border">
                            <label htmlFor="">Ürün barkodu </label>
                            <Field type="number" className="form-control" name="barcode" placeholder="Barkod" ></Field>
                        </div>
                        <ErrorMessage name="barcode" render={(errorMessage) => <p className="mt-2 text-danger">{errorMessage}</p>}></ErrorMessage>
                    </div>
                    <div className=" mb-4">
                        <div className="form-group first rounded-3 bg-white border">
                            <label htmlFor="">Ürün adı </label>
                            <Field type="text" className="form-control" name="name" placeholder="Ürün adı" ></Field>
                        </div>
                        <ErrorMessage name="name" render={(errorMessage) => <p className="mt-2 text-danger">{errorMessage}</p>}></ErrorMessage>
                    </div>
                    <div className=" mb-4">
                        <div className="form-group first rounded-3 bg-white border">
                            <label htmlFor="">Ürün açıklaması </label>
                            <Field type="text" className="form-control" name="description" placeholder="Ürün açıklaması" ></Field>
                        </div>
                        <ErrorMessage name="description" render={(errorMessage) => <p className="mt-2 text-danger">{errorMessage}</p>}></ErrorMessage>
                    </div>
                    <div className=" mb-4">
                        <div className="form-group first rounded-3 bg-white border">
                            <label htmlFor="">Ürün kategorisi </label>

                            <Field as="select" className="form-control" name="categoryName" placeholder="Ürün adı" >
                                {categories.map((item,key) => {
                                    return <option value={item.name} key={key}>{item.name}</option>
                                })}
                            </Field>
                        </div>
                        <ErrorMessage name="categoryName" render={(errorMessage) => <p className="mt-2 text-danger">{errorMessage}</p>}></ErrorMessage>
                    </div>
                    <div className=" mb-4">
                        <div className="form-group first rounded-3 bg-white border">
                            <label htmlFor="">Ürün adedi </label>

                            <Field type="number" min="1" className="form-control" name="quantity" placeholder="Ürün adedi" ></Field>
                        </div>
                        <ErrorMessage name="quantity" render={(errorMessage) => <p className="mt-2 text-danger">{errorMessage}</p>}></ErrorMessage>
                    </div>
                    <div className=" mb-4">
                        <div className="form-group first rounded-3 bg-white border">
                            <label htmlFor="">Ürün geliş fiyatı </label>

                            <Field type="number" min="1" className="form-control" name="purchasePrice" value={purchasePrice} onChange={(e) => {setPurchasePrice(e.target.value)}} placeholder="Ürün adedi" ></Field>
                        </div>
                        <ErrorMessage name="purchasePrice" render={(errorMessage) => <p className="mt-2 text-danger">{errorMessage}</p>}></ErrorMessage>
                    </div>
                    <div className=" mb-4">
                        <div className="form-group first rounded-3 bg-white border">
                            <label htmlFor="">Ürün kar payı tl </label>

                            <Field type="number" min="0" className="form-control" name="dividend" value={dividend} onChange={(e) => {setDividend(e.target.value)}} placeholder="Ürün kar payı" ></Field>
                        </div>
                        <ErrorMessage name="dividend" render={(errorMessage) => <p className="mt-2 text-danger">{errorMessage}</p>}></ErrorMessage>
                    </div>
                    <div>
                        <p>Ürün karı % : <span>{test()}</span></p>
                        <p>Satış fiyatı : <span>{calcPrice()}</span></p>
                        <button type="submit" color="info">Ürünü ekle</button>
                    </div>
                    <p className="text-muted mt-3"><Link to="/forgot-password">Şifremi unuttum</Link></p>
                </Form>
            </Formik>
        </div>
    )
}