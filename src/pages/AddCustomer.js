import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import {API_GET_CATEGORIES} from "../settings/ApiSettings";

export default function (){
    const [status,setStatus] = useState();

    const schema = Yup.object().shape({
       firstName:Yup.string().required("Müşteri adı giriniz!"),
       lastName:Yup.string().required("Müşteri soyadı giriniz!"),
       phoneNumber:Yup.number().required("Müşteri telefon numarası giriniz!"),
       address:Yup.string().required("Müşteri adresi giriniz!"),
    })
    //burda kaldın

    const { register, handleSubmit,watch,resetField, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => HandleAddCustomer(data);

    function HandleAddCustomer(value){

        axios.get(API_GET_CATEGORIES)
            .then((res) => {

            })
    }

    return <div>
        {status}
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="">Müşteri adı</label>
                <input type="text"   {...register("firstName")} />
                <label>{errors.firstName?.message}</label>
            </div>
            <div>
                <label htmlFor="">Müşteri soyadı</label>
                <input type="text"   {...register("lastName")} />
                <label>{errors.lastName?.message}</label>
            </div>
            <div>
                <label htmlFor="">Müşteri telefon numarası</label>
                <input type="text"   {...register("phoneNumber")} />
                <label>{errors.phoneNumber?.message}</label>
            </div>
            <div>
                <label htmlFor="">Müşteri Adresi</label><br/>
                <textarea type="text"   {...register("address")} />
                <label>{errors.address?.message}</label>
            </div>
            <button>Müşteri ekle</button><br/>
            <button type="reset">Temizle</button>
        </form>
    </div>
}