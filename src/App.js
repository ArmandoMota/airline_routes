import React, { Component } from 'react';
import './App.css';
import data from './data';

const getName = (id, type) => {
  if (type === 'airline') {
    return data.getAirlineById(id).name;
  } else if (type === 'airport') {
    return data.getAirportByCode(id).name;
  }
}

const App = () => (
  <div className="app">
  <header className="header">
    <h1 className="title">Airline Routes</h1>
  </header>
  <section>
    <p>
      Welcome to the app!
    </p>
    <table>
      <thead>
        <tr>
          <th>Airline</th>
          <th>Source</th>
          <th>Destination</th>
        </tr>
      </thead>
      <tbody>
        {data.routes.map(route => (
          <tr key={`${route.airline}${route.src}${route.dest}`}>
            <td>{getName(route.airline, 'airline')}</td>
            <td>{getName(route.src, 'airport')}</td>
            <td>{getName(route.dest, 'airport')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
</div>
)

export default App;