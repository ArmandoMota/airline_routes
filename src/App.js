import React, { Component, useState } from 'react';
import './App.css';
import data from './data';
import Table from './components/Table';
import Select from './components/Select';

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
  const [filteredRoutes, setFilteredRoutes] = useState(data.routes);
  const [filteredAirlines, setFilteredAirlines] = useState(data.airlines);

  const selectAirline = (e) => {
    if (e.target.value === "0") {
      setFilteredRoutes(data.routes);
    } else {
      const newRoutes = data.routes.filter(route => {
        return route.airline === Number(e.target.value);
      });

      setFilteredRoutes(newRoutes);
    }
  };

  return (
    <div className="app">
    <header className="header">
      <h1 className="title">Airline Routes</h1>
    </header>
    <section>
      <label>Show routes on</label>
      <Select options={filteredAirlines} valueKey="id" titleKey="name"
        allTitle="All Airlines" value="0" onSelect={selectAirline} />
      <Table className="routes-table" columns={columns} rows={filteredRoutes}
        perPage={25} format={formatValue} />
    </section>
  </div>
  );
};

export default App;