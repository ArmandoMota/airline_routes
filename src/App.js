import React, { Component } from 'react';
import './App.css';
import data from './data';
import Table from './components/Table';

const formatValue = (property, value) => {
  if (property === 'airline') {
    return data.getAirlineById(value).name;
  } else if (['src', 'dest'].includes(property)) {
    return data.getAirportByCode(value).name;
  }
}

const columns = [
  {name: 'Airline', property: 'airline'},
  {name: 'Source Airport', property: 'src'},
  {name: 'Destination Airport', property: 'dest'},
];

const App = () => (
  <div className="app">
  <header className="header">
    <h1 className="title">Airline Routes</h1>
  </header>
  <section>
    <p>
      Welcome to the app!
    </p>
    <Table className="routes-table" columns={columns} rows={data.routes}
      perPage={25} format={formatValue} />
  </section>
</div>
)

export default App;