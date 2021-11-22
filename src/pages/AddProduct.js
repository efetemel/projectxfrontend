import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import {AuthenticationRequest} from "../dto/AuthenticationRequest";
import Store from "../redux/Store";
import {loadUser, loginUser} from "../redux/actions/AuthActions";

export default function (){

    const schema = Yup.object().shape({
        name:Yup.string().required("Ürün adı giriniz!"),
        price:Yup.number().min(1).required("Ürün satış fiyatı giriniz"),
        purchasePrice:Yup.number().min(1).required("Ürün alış fiyatı giriniz"),
        quantity:Yup.number().min(1).required("Ürün stok adedi giriniz"),
        dividend:Yup.number().min(0).required("Ürün kar payı giriniz"),
        barcode:Yup.number().required("Ürün barkodu giriniz"),
        description:Yup.string().required("Ürün açıklaması giriniz")
    })

    const initialValues = {
        name:"",
        price:1,
        purchasePrice:1,
        quantity:1,
        dividend:0,
        barcode:"",
        description:""
    }

    const HandleAddProduct = (values) => {

        const authRequest = AuthenticationRequest;
        authRequest.email = values.email;
        authRequest.password = values.password;

        //Redux//
        Store.dispatch(loginUser(authRequest))
        Store.dispatch(loadUser())
    }

    return(
        <div>
            <Formik initialValues={initialValues} validationSchema={schema} onSubmit={(values) => HandleAddProduct(values)}>
                <Form>
                    <div className=" mb-4">
                        <div className="form-group first rounded-3 bg-white border">
                            <Field type="number" className="form-control" name="barcode" placeholder="Barkod" ></Field>
                        </div>
                        <ErrorMessage name="barcode" render={(errorMessage) => <p className="mt-2 text-danger">{errorMessage}</p>}></ErrorMessage>
                    </div>
                    <div className=" mb-4">
                        <div className="form-group first rounded-3 bg-white border">
                            <Field type="text" className="form-control" name="name" placeholder="Ürün adı" ></Field>
                        </div>
                        <ErrorMessage name="name" render={(errorMessage) => <p className="mt-2 text-danger">{errorMessage}</p>}></ErrorMessage>
                    </div>
                    <div className=" mb-4">
                        <div className="form-group first rounded-3 bg-white border">
                            <Field type="text" className="form-control" name="name" placeholder="Ürün adı" ></Field>
                        </div>
                        <ErrorMessage name="name" render={(errorMessage) => <p className="mt-2 text-danger">{errorMessage}</p>}></ErrorMessage>
                    </div>
                    <div>
                        <button type="submit" color="info">Ürünü</button>
                    </div>
                    <p className="text-muted mt-3"><Link to="/forgot-password">Şifremi unuttum</Link></p>
                </Form>
            </Formik>
        </div>
    )
}