import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function (){

    const { user } = useSelector(state => state.auth);
    const { nowVault,inCome,expense,received} = useSelector(state => state.vault);

    if (user == null){
        return <p>Lütfen bekleyiniz</p>
    }

    return(
        <div>
            <p>Hoşgeldin, {user.firstName}</p>
            <p>Kasadaki para : {nowVault}</p>
            <p>Toplam alınacak para : {received}</p>
            <p>Toplam gelir : {inCome}</p>
            <p>Toplam gider : {expense}</p><br/>

            <Link to="/add-product">Ürün ekle</Link><br/><br/>
            <Link to="/update-product">Ürün stoğu ekle</Link><br/><br/>
            <Link to="/dell-product">Ürün sil</Link><br/><br/>
            <Link to="/add-product">Stoktaki ürünleri getir</Link><br/><br/><br/>

            <Link to="/sell-product">Satış yap</Link><br/><br/>
            <Link to="/saled-product">Satılan ürünleri getir</Link><br/><br/>
            <Link to="/saled-date-product">Bugünün satışlarını getir</Link><br/><br/><br/>

            <Link to="/add-customer">Müşteri ekle</Link><br/><br/>
            <Link to="/update-customer">Müşteri düzenle</Link><br/><br/>
            <Link to="/dell-customer">Müşteri sil</Link><br/><br/>
            <Link to="/get-customer">Müşterileri getir</Link><br/><br/><br/>

            <Link to="/add-personal">Personal ekle</Link><br/><br/>
            <Link to="/update-personal">Personal düzenle</Link><br/><br/>
            <Link to="/dell-personal">Personal sil</Link><br/><br/>
            <Link to="/get-personal">Personaleri getir</Link><br/><br/>
            <Link to="/add-personal-expense">Personal Gideri ekle</Link><br/><br/><br/>
            <Link to="/logout">Çıkış yap</Link><br/><br/>

        </div>
    )
}