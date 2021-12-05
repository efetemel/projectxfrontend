import { useState } from "react"
import { API_ADD_SALES,API_GET_ALL_CUSTOMER, API_GET_PRODUCT } from "../settings/ApiSettings";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import axios from "axios";
import Loading from "./Loading";
export default function(){

    const [cart,setCart] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);

    const [customers,setCustomers] = useState();
    const [selectedCustomer,setSelectedCustomer] = useState();
    const [status,setStatus] = useState("");

    const [barcode,setBarcode] = useState();
    const [name,setName] = useState();
    const [description,setDescription] = useState();
    const [purchasePrice,setPurchasePrice] = useState();
    const [dividend,setDividend] = useState();
    const [customerType,setCustomerType] = useState("Genel Müşteri");
    const [orderType,setOrderType] = useState("Nakit");
    const [quantity,setQuantity] = useState(1);
    const [product,setProduct] = useState();
    const [value,setValue] = useState()
    const [sellDescription,setSellDescription] = useState();
    const [loading,setLoading] = useState(true);

    if (loading == true){
        axios.get(API_GET_ALL_CUSTOMER)
            .then((res) => {
                setCustomers(res.data)
                setLoading(false)
            })
    }

    if(loading == true){
        return <Loading/>
    }

    

    function dividendCalc(){
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
    

    function priceCalc(){

        if ( purchasePrice != null &&purchasePrice >= 1){
            if (dividend != null && dividend >=1){
                return (parseFloat(purchasePrice) + parseFloat(dividend)) * parseInt(quantity);
            }
            else{
                return parseFloat(purchasePrice) * parseInt(quantity);
            }
        }
        else{
            return 0;
        }
    }


    function checkCustomerOrOrderType(){
        if(customerType === "Genel Müşteri"){
            return <div>
                <label htmlFor="">Ödeme Tipi</label>
                <span>
                    <input type="radio" value="Nakit" checked={orderType === "Nakit"} onChange={(e) => {setOrderType(e.target.value)}} />
                    <label htmlFor="">Nakit</label>
                </span>
                <span>
                    <input type="radio" value="Pos" checked={orderType === "Pos"} onChange={(e) => {setOrderType(e.target.value)}} />
                    <label htmlFor="">Pos</label>
                </span>
            </div>
        }
        else{
            return <div>
                <label htmlFor="">Müşteri seçin</label>
                <select value={selectedCustomer} onChange={(e) => {setSelectedCustomer(e.target.value)}}>
                    <option value="" disabled selected>Müşteri Seçiniz</option>
                    {
                        customers.map((item,key) => {
                            return <option key={key} value={item.firstName +" "+ item.lastName}>{item.firstName +" "+ item.lastName}</option>
                        })
                    }
                </select>
                <div>
                <label htmlFor="">Ödeme Tipi</label>
                <span>
                    <input type="radio" value="Nakit" checked={orderType === "Nakit"} onChange={(e) => {setOrderType(e.target.value)}} />
                    <label htmlFor="">Nakit</label>
                </span>
                <span>
                    <input type="radio" value="Pos" checked={orderType === "Pos"} onChange={(e) => {setOrderType(e.target.value)}} />
                    <label htmlFor="">Pos</label>
                </span>
                <span>
                    <input type="radio" value="Veresiye" checked={orderType === "Veresiye"} onChange={(e) => {setOrderType(e.target.value)}} />
                    <label htmlFor="">Veresiye</label>
                </span>
            </div>
            </div>
        }
    }


    function checkBarcode(){
        if(barcode != null &&barcode.toString().length >= 13 && barcode.toString().length <= 20 && status == "" && (product == null||product.barcode != barcode )){
            axios.get(API_GET_PRODUCT + barcode)
            .then((res) => {
                setProduct(res.data)
                setName(res.data.name)
                setDescription(res.data.description)
                setPurchasePrice(res.data.purchasePrice);
                setDividend(res.data.dividend)
            })
            .catch((err) => {
                setProduct()
                setName()
                setDescription()
                setPurchasePrice();
                setDividend()
                setBarcode(0)
            })
        }
    }

    function HandleSellProduct(values){

    }

    function addCartItem(){
        if(product != null){
            const item = {
                barcode:product.barcode,
                name:product.name,
                quantity:parseInt(quantity),
                price:parseFloat(priceCalc()),
                unitPrice:parseFloat(purchasePrice) + parseFloat(dividend)
            }
            if(cart.length >= 0){
                var checkCart = cart.findIndex(c=>c.name == item.name);
                if(checkCart >= 0){
                    cart[checkCart].quantity = parseInt(cart[checkCart].quantity) + parseInt(quantity);
                    cart[checkCart].price = parseFloat(cart[checkCart].price)+parseFloat( priceCalc());
                }
                else{
                    setCart([...cart,item])

                }
                
                const oldTotal = totalPrice;
                setTotalPrice(parseFloat(oldTotal)+parseFloat(item.price));
            }
            else{
                setCart([item])
                setTotalPrice(priceCalc());

            }

        }
        
    }
    function dellCartItem(key){
        if(product != null &&  cart != null){
            if(cart[key].quantity > 1){
              cart[key].quantity -= 1;
              cart[key].price -= cart[key].unitPrice;
              const oldTotal = totalPrice;
              setTotalPrice(parseFloat(oldTotal)-parseFloat(cart[key].unitPrice));
            }
            else{
               const newCart = []
               cart.forEach((item,key1)=> {
                   if(key1 != key){
                       newCart.push(item)
                   }
               })
               const oldTotal = totalPrice;
               setTotalPrice(parseFloat(oldTotal)-parseFloat(cart[key].unitPrice));
               setCart(newCart)
            }
           
        }
    }

    function clearCart(){
        setCart([]);
        setTotalPrice(0);
    }

    function isFastSailing(){
        if(cart.length <= 0){
            return <button onClick={() => {fastSaling()}}>Ürünü direk sat</button>
        }else{
            return <>
                <span>Sepet</span>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Ürün Barkodu</th>
                            <th>Ürün Adı</th>
                            <th>Ürün Adedi</th>
                            <th>Ürün Fiyatı</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item,key) => {
                                return <tr key={key}>
                                    <td>{item.barcode}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td><button onClick={() => {dellCartItem(key)}}>Sil</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table><br />
                <p>Sepet Toplam Tutar {totalPrice}</p>
                <button onClick={() => {clearCart()}}>Sepete Temizle</button><br /><br />
                <button>Sepetteki ürünleri sat</button></>
        }
    }

    function isVeresiye(){

    }
 
    function fastSaling(){
        if(product != null && barcode != null){
            //customer type
            if(customerType === "Genel Müşteri"){
                //order type
                const sale = {
                    barcode : barcode,
                    price:priceCalc(),
                    quantity:quantity,
                    description:"",
                    paymentTypeName:orderType
                }
                setStatus("Ürün satılıyor");
                axios.post(API_ADD_SALES,sale)
                    .then((res) => {
                        setStatus("Ürün Satıldı!");
                        setProduct()
                        setName()
                        setDescription()
                        setPurchasePrice();
                        setDividend()
                        setBarcode(0)
                    })
                    .catch((err) => {
                        setStatus("Ürün satılamadı => "+err.message)
                    })
            }
            else if(customerType === "Özel Müşteri"){
                 //order type
                if(orderType === "Veresiye"){
                    
                }
                else{
                    //backend de özel müşteriye nakit pos eklenecek
                    //şuan sadece veresiye var özel müşteride
                    const sale = {
                        barcode : barcode,
                        price:priceCalc(),
                        quantity:quantity,
                        description:"",
                        paymentTypeName:orderType
                    }
                    setStatus("Ürün satılıyor");
                    axios.post(API_ADD_SALES,sale)
                        .then((res) => {
                            setStatus("Ürün Satıldı!");
                            setProduct()
                            setName()
                            setDescription()
                            setPurchasePrice();
                            setDividend()
                            setBarcode(0)
                        })
                        .catch((err) => {
                            setStatus("Ürün satılamadı => "+err.message)
                        })
                }
            }
        }

    }
    return <div>
        {status}
        {checkBarcode()}<br/>
        <div>
            <label htmlFor="">Ürün barkodu</label>
            <input type="number" value={barcode} onChange={(e) => {setBarcode(e.target.value)}}  />
        </div>
        <div>
            <label htmlFor="">Ürün adı</label>
            <input type="text" value={name} onChange={(e) => {setName(e.target.name)}} disabled />
        </div>
        <div>
            <label htmlFor="">Ürün açıklaması</label>
            <input type="text" value={description} disabled onChange={(e) => {setDescription(e.target.name)}} disabled />
        </div>
        <div>
            <label htmlFor="">Müşteri tipi</label>
            <span>
                <input type="radio" value="Genel Müşteri" checked={customerType === "Genel Müşteri"} onChange={(e) => {setCustomerType(e.target.value)}} />
                <label htmlFor="">Genel Müşteri</label>
            </span>
            <span>
                <input type="radio" value="Özel Müşteri" checked={customerType === "Özel Müşteri"} onChange={(e) => {setCustomerType(e.target.value)}} />
                <label htmlFor="">Özel Müşteri</label>
            </span>
            {checkCustomerOrOrderType()}
        </div>
        <div>
            <label htmlFor="">Satış açıklaması (isteğe bağlı)</label>
            <input type="text" value={sellDescription} onChange={(e) => {setSellDescription(e.target.value)}}/>
        </div>
        <div>
            <label htmlFor="">Ürün adedi</label>
            <input type="number" value={quantity} min="1"  onChange={(e) => {setQuantity(e.target.value)}}/> 
        </div>
        <div>
            <label htmlFor="">Ürün geliş fiyatı</label>
            <input value={purchasePrice}  onChange={(e) => {setPurchasePrice(e.target.value)}}/> 
        </div>
        <div>
            <label htmlFor="">Ürün kar payı</label>
            <input value={dividend}  onChange={(e) => {setDividend(e.target.value)}}/> 
        </div>
        <p>Ürün kar payı % <span>{dividendCalc()}</span></p>
        <p>Ürün satış fiyatı <span>{priceCalc()}</span></p>
        <button onClick={() => {addCartItem()}}>Sepete Ekle</button><br />
        {isFastSailing()}<br/>
        

    </div>
}