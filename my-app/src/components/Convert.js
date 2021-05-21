import React from 'react'

export default function ConversionRow({countries,amount,onChangeAmount,onChangeCurrency,baseCurrency}) {

  return (
    <div className="wrapper-inner">
    <input type="number" className="input" value={amount} onChange={onChangeAmount} />

      <select value={baseCurrency} onChange={onChangeCurrency}>
      {countries.map(countries =>(
                    <option key={countries.alpha3Code} value={countries.currencies[0].code }> {countries.name} - {countries.currencies[0].code }</option>
                ))}
      </select>
    </div>
  )
}
