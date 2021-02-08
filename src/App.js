import React, { Component, useState } from 'react';
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

const App = () => {
  const [routes, setRoutes] = useState(data.routes);

  const handleChange = (e) => {
    const newRoutes = data.routes.filter(route => {
      return route.airline === Number(e.target.value);
    });

    setRoutes(newRoutes);
  };

  return (
    <div className="app">
    <header className="header">
      <h1 className="title">Airline Routes</h1>
    </header>
    <section>
      <label>Show routes on</label>
      <select onChange={handleChange}>
        {data.airlines.map(airline => (
          <option key={airline.id} value={airline.id}>{airline.name}</option>
        ))}
      </select>
      <Table className="routes-table" columns={columns} rows={routes}
        perPage={25} format={formatValue} />
    </section>
  </div>
  );
};

export default App;