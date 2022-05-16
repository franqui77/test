import React, { useState, useEffect } from 'react';
import './App.css';
//import { Kushki } from '@kushki/js';
import axios from 'axios'; 

function App() {
  const [name, setName] = useState('Franqui Carrera');
  const [tarjeta, setTarjeta] = useState('5451951574925480');
  const [month, setMonth] = useState('05');
  const [year, setYear] = useState('2022');
  const [cvc, setCvc] = useState('123');

  const onChangeName = (e) => {
    setName(e.target.value);    
  };
  const onChangeTarjeta = (e) => {
    setTarjeta(e.target.value);    
  };
  const onChangeMonth = (e) => {
    setMonth(e.target.value);    
  };
  const onChangeYear = (e) => {
    setYear(e.target.value);    
  };
  const onChangeCvc = (e) => {
    setCvc(e.target.value);    
  };
  const onPay = async() => {
    /*const kushki = new Kushki({
      merchantId: '20000000107536933000', 
      inTestEnvironment: true,
      regional:false
    });*/

    /*var callback = function(response) {
      if(!response.code){
        alert(response);
      } else {
        alert('Error: ',response.error, 'Code: ', response.code, 'Message: ',response.message);
      }
    }*/
    
    /*Kushki.requestToken({
      amount: '50.00',
      currency: "USD",
      card: {
        name: name,
        number: tarjeta,
        cvc: cvc,
        expiryMonth: month,
        expiryYear: year
    },
    }, callback);*/

    let options = {
      method: 'POST',
      url: 'https://stoplight.io/mocks/api-kushki-docs/API-REFERENCE/2951998/card/v1/tokens',
      headers: {
        'Content-Type': 'application/json',
        'Public-Merchant-Id': '20000000107536933000',
        Prefer: ''
      },
      data: {
        card: {
          name: name,
          number: tarjeta,
          expiryMonth: month,
          expiryYear: year,
          cvv: cvc
        },
        totalAmount: 16.98,
        currency: 'USD'
      }
    };
    
    axios.request(options).then(function (response) {      
      const options2 = {
        method: 'POST',
        url: 'https://stoplight.io/mocks/api-kushki-docs/API-REFERENCE/2951998/card/v1/charges',
        headers: {
          'Content-Type': 'application/json',
          'Private-Merchant-Id': '20000000107536933000',
          Prefer: ''
        },
        data: {
          token: response.data.token,
          amount: {subtotalIva: 0, subtotalIva0: 50.00, ice: 0, iva: 0, currency: 'USD'},
          metadata: {Referencia: '987654'},
          contactDetails: {
            documentType: 'CC',
            documentNumber: '1234567890',
            email: 'user@test.com',
            firstName: 'Franqui',
            lastName: 'Carrera',
            phoneNumber: '+593912345678'
          },
          orderDetails: {
            siteDomain: 'test.com',
            shippingDetails: {
              name: 'Franqui Carrera',
              phone: '+593912345678',
              address1: 'Eloy Alfaro 139 y Catalina Aldaz',
              address2: 'centro 123',
              city: 'Daules',
              region: 'Pichincha',
              country: 'Ecuador'
            },
            billingDetails: {
              name: 'Franqui Carrera',
              phone: '+593912345678',
              address1: 'Eloy Alfaro 139 y Catalina Aldaz',
              address2: 'centro 123',
              city: 'Daule',
              region: 'Guayas',
              country: 'Ecuador'
            }
          },
          productDetails: {
            product: [
              {
                id: '198952AB',
                title: 'eBook Digital Services',
                price: 10000,
                sku: '10101042',
                quantity: 1
              },
              {
                id: '198953AB',
                title: 'eBook Virtual Selling',
                price: 6980,
                sku: '004834GQ',
                quantity: 1
              }
            ]
          },
          fullResponse: true
        }
      };
      
      axios.request(options2).then(function (response) {
        alert('Pago realizado con éxito');
      }).catch((error) => {
        alert('Tarjeta no ha sido aprobadas. Error: ' + error.message);
      });
    }).catch((error) => {
      alert('Tarjeta no ha sido aprobada. Error: ' + error.message);
    });
  };

  useEffect(() => {
      
  },[]);

  return (
     <div className="min-w-screen min-h-screen flex justify-center items-center bg-gray-50 py-5">
       <div className="w-auto lg:w-1/2 bg-gray-50 p-5">
        <div className="w-full flex flex-col justify-start items-center rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
          <div className="w-full flex mb-3 justify-start items-center">
            <div className="w-24">
              <span className="text-gray-600 font-semibold">Contact</span>
            </div>
            <div className="flex-grow pl-3">
              <span>Franqui Carrera</span>
            </div>
          </div>
          <div className="w-full flex mb-3 justify-start items-center">
            <div className="w-24">
              <span className="text-gray-600 font-semibold">Dirección</span>
            </div>
            <div className="flex-grow pl-3">
              <span>Villaclub Floral, Ecuador</span>
            </div>
          </div>
          <div className="w-full flex mb-3 justify-start items-center">
            <div className="w-24">
              <span className="text-gray-600 font-semibold">Monto</span>
            </div>
            <div className="flex-grow pl-3">
              <span>$50.00</span>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
          <div className="w-full p-3 border-b border-gray-200">
            <div className="mb-5">             
                <img alt='tarjeta' src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-6 ml-3" />              
            </div>
            <div>
              <div className="mb-3">
                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Nombre</label>
                <div>
                  <input value={name} onChange={onChangeName} className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Titular de la tarjeta" type="text" />
                </div>
              </div>
              <div className="mb-3">
                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">No. Tarjeta</label>
                <div>
                  <input value={tarjeta} onChange={onChangeTarjeta} className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="0000 0000 0000 0000" type="text" />
                </div>
              </div>
              <div className="mb-3 -mx-2 flex items-end">
                <div className="px-1 w-[175px]">
                  <div>
                  <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Fecha Expiración</label>
                    <select value={month} onChange={onChangeMonth} className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                      <option value="01">01 - Enero</option>
                      <option value="02">02 - Febrero</option>
                      <option value="03">03 - Marzo</option>
                      <option value="04">04 - Abril</option>
                      <option value="05">05 - Mayo</option>
                      <option value="06">06 - Junio</option>
                      <option value="07">07 - Julio</option>
                      <option value="08">08 - Agosto</option>
                      <option value="09">09 - Septiembre</option>
                      <option value="10">10 - Octubre</option>
                      <option value="11">11 - Noviembre</option>
                      <option value="12">12 - Diciembre</option>
                    </select>
                  </div>
                </div>
                <div className="px-2 w-[120px]">
                  <select value={year} onChange={onChangeYear} className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">                                        
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                  </select>
                </div>
                <div className="px-2 w-1/4">
                  <div>
                  <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">CVC</label>
                    <input value={cvc} onChange={onChangeCvc} className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="000" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a className="flex justify-center items-center p-3" href='https://www.kushki.com'>            
              <img alt="Kushki" src="https://theme.zdassets.com/theme_assets/1024770/0921608185f05994fa12362b696504b62c52d615.png" width="80" className="ml-3" />            
          </a>
        </div>
        <div>
          <button onClick={onPay} className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"><i className="mdi mdi-lock-outline mr-1"></i>PAGAR</button>
        </div>
      </div>
      </div>
  );
}

export default App;
