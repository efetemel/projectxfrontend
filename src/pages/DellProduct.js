import { useState } from "react";
import axios from "axios";

import {
  API_DELL_PRODUCT,
  API_GET_PRODUCT,
} from "../settings/ApiSettings";

export default function () {
  const [status, setStatus] = useState("");


  const [name, setName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [dividend, setDividend] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState("");

  const HandleDellProduct = (values) => {
    setStatus("");

    setStatus("Ürün siliniyor lütfen bekleyiniz!");

    axios.get(API_DELL_PRODUCT + barcode)
      .then((res) => {
          setProduct(res.data)
        setStatus("Ürün başarıyla silindi!");
      })
      .catch((res) => {
        setStatus(res.message);
      });
  };

  function dividendCalc() {
    if (purchasePrice != null && purchasePrice >= 1) {
      if (dividend != null && dividend >= 1) {
        return Math.round(
          (parseFloat(dividend) / parseFloat(purchasePrice)) * 100
        );
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  function priceCalc() {
    if (purchasePrice != null && purchasePrice >= 1) {
      if (dividend != null && dividend >= 1) {
        return parseFloat(purchasePrice) + parseFloat(dividend);
      } else {
        return parseFloat(purchasePrice);
      }
    } else {
      return 0;
    }
  }

  if(barcode != null && barcode.toString().length >= 13 &&  barcode.toString().length <= 20){
      if(product == null || product.barcode != barcode){
        axios.get(API_GET_PRODUCT+barcode)
        .then((res) => {
            setProduct(res.data);
            setName(res.data.name);
            setDescription(res.data.description);
            setQuantity(res.data.quantity);
            setPurchasePrice(res.data.purchasePrice);
            setDividend(res.data.dividend);

        })
        .catch((err) => {
            
        })
      }    
  }

  return (
    <div>
      {status}
      <div>
        <label htmlFor="">Ürün barkodu</label>
        <input
          type="text"
          placeholder="Ürün barkodu"
          value={barcode}
          onChange={(e) => {setBarcode(e.target.value)}}
        />
      </div>
      <br />
      <div>
        <label htmlFor="">Ürün adı</label>
        <input type="text"  value={name} disabled  onChange={(e) => {setName(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="">Ürün açıklaması</label>
        <input type="text" value={description} disabled onChange={(e) => {setDescription(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="">Ürün adedi</label>
        <input type="number" value={quantity} disabled onChange={(e) => {setQuantity(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="">Ürün geliş fiyatı</label> 
        <input type="number" value={purchasePrice} disabled onChange={(e) => {setPurchasePrice(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="">Ürün kar payı</label>
        <input type="number" value={dividend} disabled onChange={(e) => {setDividend(e.target.value)}}/>
      </div>
      <p>
        Ürün kar payı % <span>{dividendCalc()}</span>
      </p>
      <p>
        Ürün satış fiyatı <span>{priceCalc()}</span>
      </p>
      <input type="submit" value="Ürünü sil" onClick={()=> {HandleDellProduct()}} />
    </div>
  );
}
