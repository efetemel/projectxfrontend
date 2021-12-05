import ReactLoading from 'react-loading';
import { Link } from "react-router-dom";
import "../css/loading.css";
import { useState } from "react";

export default function (){
    const [x,setX] = useState(false);

    function more(){
        setInterval(function (){
           if(x != true){
               setX(true)
           }
        },3000)
    }


    return <div className="loading-div">
        <div className="container">
            <ReactLoading className="loading" type="spin" color="dodgerblue"  height={'150px'} width={'150px'} />
        </div>
        <br/><br/>
        <p className="pls-p">Lütfen bekleyiniz.</p><br/>
        {more()}
        {x ?  <>
            <p className="redirect">Erişim sorunu yaşıyorsanız <Link to="/login">giriş yapabilir</Link> veya bekleyebilirsiniz.</p><br/>
            <p className="redirect">2021 @ SKY Tüm hakları saklıdır.</p>
            </> : <></>}
    </div>
}