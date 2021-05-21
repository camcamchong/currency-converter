import Convert from './components/Convert';

import './App.css';
import {getCountries, getConversion } from './services/APIService';
import React, { useState, useEffect } from 'react';

const App = () => {

 
  const [countries,setCountries]  = useState([]);
  const [baseCurrency, setBaseCurrency] = useState()
  const [targetCurrency, setTargetCurrency] = useState()

  const [amount, setAmount] = useState()
  const [base, setBase] = useState(1)
  const [target, setTarget] = useState(1)

  const [baseAmountChange, setbaseAmountChange] = useState(true);


  //initalizng variables
  useEffect(async () => {
    const countries = await getCountries();
    const countriesData = countries.data;
    setCountries(countriesData);

    setBaseCurrency(countriesData[0].currencies[0].code);
    setTargetCurrency(countriesData[1].currencies[0].code);

    setBase(1);
    setTarget(1);
  

  }, []);


//update any time there is an update in the base or target conversions
useEffect(async ()=>{
  if( base != null && target != null){
    if(baseAmountChange){
      const conversion = await getConversion(baseCurrency,targetCurrency,base);
      setTarget(conversion.data.conversion_result);

    }
    else{
      const conversion = await getConversion(baseCurrency,targetCurrency,target);
      setBase(conversion.data.conversion_result);

    }
  }
},[baseCurrency, targetCurrency,base,target] )

  function baseChange(e){
    setBase(e.target.value);
    setbaseAmountChange(true);

  }

  function targetChange(e){
    setTarget(e.target.value);
    setbaseAmountChange(false);
  }


  return (

      <div className="Wrapper">
        
        <div className="col-4 bg">
          <h1>
             Currency Conversion
          </h1>

          <p>
            {base} {baseCurrency} 
          </p>
          <div className="icon-wrapper "><i className="fa fas fa-arrows-v swap "></i></div>

          <p>
           {target} {targetCurrency}
          </p>
        </div>

        <div className="col-8">
          <Convert
          countries={countries}
          onChangeAmount={ baseChange}
          onChangeCurrency={e => setBaseCurrency(e.target.value)}
          baseCurrency = {baseCurrency}
          targetCurrency = {targetCurrency}
          amount={base}
          />
          
          {/* <div className="icon-wrapper align-center"><i className="fa fas fa-arrows-v swap "></i></div> */}
          
                <Convert
          countries={countries}
          onChangeAmount={ targetChange}
          onChangeCurrency={e => setTargetCurrency(e.target.value)}
          baseCurrency = {targetCurrency}
          targetCurrency = {baseCurrency}
          amount={target}
          />
        </div>

      </div>
  );
}

export default App;
