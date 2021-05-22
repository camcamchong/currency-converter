import React from 'react'

export default function ConversionRow({countries,amount,onChangeAmount,onChangeCurrency,country}) {

  return (
    <div className="wrapper-inner">
    <input step='0.01' type="number"  className="input" value={amount} onChange={onChangeAmount} />

      <select onChange={onChangeCurrency}>
      {countries.map(countries =>(

        <option key={countries.name} value={countries.currencies[0].code}> {countries.name} - {countries.currencies[0].code }</option>
                ))}
      </select>
    </div>
  )
}
