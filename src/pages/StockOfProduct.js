import { API_GET_PRODUCTS } from "../settings/ApiSettings";
import { useEffect, useState } from "react";
import axios from "axios";

export default function(){

    const [loading,setLoading] = useState(true);
    const [totalProducts,setTotalProducts] = useState([]);

    if (loading == true){
        axios.get(API_GET_PRODUCTS)
            .then((res) => {
                setTotalProducts(res.data)
                setLoading(false)
            })
    }

    if(loading == true){
        return <p>Lütfen bekleyin</p>
    }

    function dividendCalc(purchasePrice,dividend){


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
    

    function priceCalc(purchasePrice,dividend){

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

    return <div>
        <p><strong>Not</strong> <span>Burada satılmamış durumdaki ürünler yer almaktadır.</span></p>
        <table border="1">
            <thead>
                <tr>
                    <th>Ürün Barkodu</th>
                    <th>Ürün Adı</th>
                    <th>Ürün Stok Adedi</th>
                    <th>Ürün Kategorisi</th>
                    <th>Ürün Açıklaması</th>
                    <th>Ürün Geliş Fiyat</th>
                    <th>Ürün Kar Payı (tl)</th>
                    <th>Ürün Kar Payı (%)</th>
                    <th>Ürün Satış fiyatı</th>
                </tr>
            </thead>
               <tbody>
               {
                    totalProducts.map((item,key) => {
                        return <tr key={key} >
                                <td>{item.barcode}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.category}</td>
                                <td>{item.description}</td>
                                <td>{item.purchasePrice}</td>
                                <td>{item.dividend}</td>
                                <td>{dividendCalc(item.purchasePrice,item.dividend)}</td>
                                <td>{priceCalc(item.purchasePrice,item.dividend)}</td>
                            </tr>
                    })
                }
               </tbody>
            
        </table>
    </div>
}