import Convert from './components/Convert';

import './App.css';
import {getCountries, getConversion } from './services/APIService';
import React, { useState, useEffect } from 'react';

const App = () => {

 
  const [countries,setCountries]  = useState([]);
  const [baseCurrency, setBaseCurrency] = useState()
  const [targetCurrency, setTargetCurrency] = useState()

  const [baseCountry, setBaseCountry] = useState();
  const [targetCountry, setTargetCountry] = useState();

  // const [amount, setAmount] = useState()
  const [base, setBase] = useState(1)
  const [target, setTarget] = useState(1)

  const [baseAmountChange, setbaseAmountChange] = useState(true);


  //initalizng variables
  useEffect(async () => {
    const countries = await getCountries();
    const countriesData = countries.data;
    setCountries(countriesData);

    setBaseCurrency(countriesData[0].currencies[0].code);
    setTargetCurrency(countriesData[0].currencies[0].code);
    
    setBaseCountry(countriesData[0].name);
    setTargetCountry(countriesData[0].name);

    setBase(1);
    setTarget(1);
  

  }, []);


//update any time there is an update in the base or target conversions
useEffect(async ()=>{
  if( base != null && target != null){
    if(baseAmountChange){
      const conversion = await getConversion(baseCurrency,targetCurrency,base);
      setTarget((conversion.data.conversion_result));
    }
    else{
      const conversion = await getConversion(baseCurrency,targetCurrency,target);
      setBase((conversion.data.conversion_result));

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

function setBaseCountryCurrency(e){
  setBaseCurrency(e.target.value)
}

function setTargetCountryCurrency(e){
  setTargetCurrency(e.target.value)
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
          onChangeCurrency={setBaseCountryCurrency}
          baseCurrency = {baseCurrency}
          targetCurrency = {targetCurrency}
          amount={base}
          country ={baseCountry}
          />
          
          {/* <div className="icon-wrapper align-center"><i className="fa fas fa-arrows-v swap "></i></div> */}
          
                <Convert
          countries={countries}
          onChangeAmount={ targetChange}
          onChangeCurrency={setTargetCountryCurrency}
          baseCurrency = {targetCurrency}
          targetCurrency = {baseCurrency}
          amount={target}
          country={targetCountry}
          />
        </div>

      </div>
  );
}

export default App;
