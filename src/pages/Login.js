import { useSelector } from "react-redux";
import {Link, Navigate} from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage,Form } from "formik";
import { AuthenticationRequest } from "../dto/AuthenticationRequest";
import Store from "../redux/Store";
import {getState, loadUser, loginUser} from "../redux/actions/AuthActions";
import "../css/login.css"
import {useState} from "react";
export default function (){

    const { isAuthentication,isLoginLoading } = useSelector(state => state.auth);
    const [error,setError] = useState(false)
    const [status,setStatus] = useState(null);
    function isAuthControl(){
        if (isAuthentication == false){
            return loginHtml();
        }
        return <Navigate to="/"></Navigate>
    }

    const schema = Yup.object().shape({
        email:Yup.string().email("E-posta geçersiz!").required("E-posta geçersiz!"),
        password:Yup.string().required("Geçersiz şifre!").min(3,"Şifre en az 3 karakterli olabilir!")
    })

    const initialValues = {
        email:"",
        password:""
    }

    const HandleLogin = (values) => {
        const authRequest = AuthenticationRequest;
        authRequest.email = values.email;
        authRequest.password = values.password;

        //Redux//
        Store.dispatch(loginUser(authRequest,setStatus))
        Store.dispatch(loadUser())
    }

    if(status == false && error == ""){
        setError("Eposta adresi veya şifre hatalı")
    }

    function btn(){
        if (isLoginLoading){
            return <button type="submit" className="login-loading" disabled>Lütfen bekleyiniz</button>
        }
        else{
            return <button type="submit" className="login-btn">Giriş yap</button>
        }
    }

    function loginHtml(){
        return <div>
            <div className="login-container">
                <div className="con">
                    <img src="https://cdn.discordapp.com/attachments/759029621018198076/915696792719478825/skyweb.png" alt="logo"/>
                    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={(values) => HandleLogin(values)}>
                        <Form>
                            <div className=" mb-4">
                                <div className="form-group first rounded-3 bg-white border">
                                    <Field type="email" className="form-control" name="email" placeholder="E-posta" ></Field>
                                </div>
                            </div>
                            <div className=" mb-4">
                                <div className="form-group first rounded-3 bg-white border">
                                    <Field type="password" className="form-control" name="password" placeholder="Şifre" ></Field>
                                </div>
                            </div>
                            <div>
                                { btn() }
                                <ErrorMessage name="email" render={(errorMessage) => <p className="mt-2 text-danger">{errorMessage}</p>}></ErrorMessage>
                                <ErrorMessage name="password" render={(errorMessage) => <p className="text-danger mt-2">{errorMessage}</p>}></ErrorMessage>
                            </div>
                            {
                                error ? <p className="error">{error}</p> : <></>
                            }
                            <p className="text-muted mt-3"><Link to="/forgot-password">Şifremi unuttum</Link></p><br/><br/>

                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    }

    return(
        <div>
            { isAuthControl() }
        </div>
    )
}