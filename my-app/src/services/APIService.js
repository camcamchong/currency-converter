import axios from 'axios';

export const getCountries = async ()  =>{
    const res = await axios.get(
      `https://restcountries.eu/rest/v2/all` );
    // console.log(res);
    
      return res;
};


export const getConversion = async (base,target,amount)  =>{
  const res = await axios.get(
    `https://v6.exchangerate-api.com/v6/c7d33b68331ca1aab07d6d75/pair/${base}/${target}/${amount}` );
      
  // console.log("help" + res);
  // console.log(`https://v6.exchangerate-api.com/v6/c7d33b68331ca1aab07d6d75/pair/${base}/${target}`);
  
    return res;
};


// export default CountriesService; 