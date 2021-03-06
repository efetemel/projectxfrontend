import { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddProductRequest } from "../dto/AddProductRequest";
import { useParams, useNavigate } from "react-router-dom";
import {
  API_ADD_PRODUCT,
  API_GET_CATEGORIES,
  API_GET_PRODUCT,
} from "../settings/ApiSettings";

export default function () {
  const [status, setStatus] = useState("");
  let { paramBarcode } = useParams();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const history = useNavigate();

  if (loading == true) {
      
    axios.get(API_GET_CATEGORIES).then((res) => {
      setCategories(res.data);
      axios.get(API_GET_PRODUCT + paramBarcode)
      .then((res1) => {
        setLoading(false)
        setProduct(res1.data);
        setName(res1.data.name);
        setDescription(res1.data.description);
        setCategory(res.data[0].name);
        setPurchasePrice(res1.data.purchasePrice);
        setDividend(res1.data.dividend);

      })
      .catch((err) => {
        history("/");
      });
    });
    
  }

  const [name, setName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [dividend, setDividend] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState("");

  const HandleAddProduct = (values) => {
    setStatus("");
    const addRequest = AddProductRequest;

    addRequest.name = name;
    addRequest.barcode = product.barcode.toString();
    addRequest.dividend = parseFloat(dividend);
    addRequest.purchasePrice = parseFloat(purchasePrice);
    addRequest.category = category;
    addRequest.description = description;
    addRequest.quantity = quantity;
    addRequest.price = priceCalc();
    setStatus("??r??n ekleniyor l??tfen bekleyiniz!");

    axios.post(API_ADD_PRODUCT, addRequest)
      .then((res) => {
          setProduct(res.data)
        setStatus("??r??n ba??ar??yla eklendi!");
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

  function addProduct() {
    dividendCalc();
    priceCalc();
  }

  return (
    <div>
      {status}
      <div>
        <label htmlFor="">??r??n barkodu</label>
        <input
          type="text"
          placeholder="??r??n barkodu"
          value={product.barcode}
          disabled
        />
      </div>
      <div>
        <label htmlFor="">??r??n ad??</label>
        <input type="text"  value={name} disabled  onChange={(e) => {setName(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="">??r??n a????klamas??</label>
        <input type="text" value={description} disabled onChange={(e) => {setDescription(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="">??r??n kategorisi</label>
        <select disabled values={category} onChange={(e) => {setCategory(e.target.value)}}>
        <option value="" disabled selected>Kategori Se??iniz</option>
          {categories.map((item, key) => {
            return (
              <option value={item.name} key={key}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label htmlFor="">??r??n adedi</label>
        <input type="number" value={quantity} onChange={(e) => {setQuantity(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="">??r??n geli?? fiyat??</label> 
        <input type="number" value={purchasePrice} disabled onChange={(e) => {setPurchasePrice(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="">??r??n kar pay??</label>
        <input type="number" value={dividend} disabled onChange={(e) => {setDividend(e.target.value)}}/>
      </div>
      <p>
        ??r??n kar pay?? % <span>{dividendCalc()}</span>
      </p>
      <p>
        ??r??n sat???? fiyat?? <span>{priceCalc()}</span>
      </p>
      <input type="submit" value="??r??n ekle" onClick={()=> {HandleAddProduct()}} />
    </div>
  );
}
