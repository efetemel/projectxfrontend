import { useSelector } from "react-redux";
import {Link, Navigate} from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage,Form } from "formik";
import { AuthenticationRequest } from "../dto/AuthenticationRequest";
import Store from "../redux/Store";
import { loadUser, loginUser } from "../redux/actions/AuthActions";

export default function (){

    const { isAuthentication,isLoginLoading } = useSelector(state => state.auth);

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
        Store.dispatch(loginUser(authRequest))
        Store.dispatch(loadUser())
    }

    function btn(){
        if (isLoginLoading){
            return <button type="submit" color="danger" disabled>Lütfen bekleyin</button>
        }
        else{
            return <button type="submit" color="info">Giriş yap</button>
        }
    }

    function loginHtml(){
        return <div>
            <Formik initialValues={initialValues} validationSchema={schema} onSubmit={(values) => HandleLogin(values)}>
                <Form>
                    <div className=" mb-4">
                        <div className="form-group first rounded-3 bg-white border">
                            <Field type="email" className="form-control" name="email" placeholder="E-posta" ></Field>
                        </div>
                        <ErrorMessage name="email" render={(errorMessage) => <p className="mt-2 text-danger">{errorMessage}</p>}></ErrorMessage>
                    </div>
                    <div className=" mb-4">
                        <div className="form-group first rounded-3 bg-white border">
                            <Field type="password" className="form-control" name="password" placeholder="Şifre" ></Field>
                        </div>
                        <ErrorMessage name="password" render={(errorMessage) => <p className="text-danger mt-2">{errorMessage}</p>}></ErrorMessage>
                    </div>
                    <div>
                        { btn() }
                    </div>
                    <p className="text-muted mt-3"><Link to="/forgot-password">Şifremi unuttum</Link></p>
                </Form>
            </Formik>
        </div>
    }

    return(
        <div>
            { isAuthControl() }
        </div>
    )
}