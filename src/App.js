import React, { Component, useState, useEffect } from 'react';
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
  const [airlineSelected, setAirlineSelected] = useState(false);
  const [airportSelected, setAirportSelected] = useState(false);
  const [filtered, setFiltered] = useState({
    airlines: [],
    airports: [],
    routes: [],
  });

  useEffect(() => {
    setFiltered({
      routes: data.routes,
      airlines: data.airlines,
      airports: data.airports,
    });
    // setAirlineSelected(false);
    // setAirportSelected(false);
  }, []);

  // select single airline, all-airlines all-airports (filter airlines to selected, filter airports to valid)
  // select single airline, filtered-airlines selected-airport (filter airlines to selected, don't touch filtered airports)
  // select all airlines, selected-airline all-airports (filter airlines to all, filter airports to all)
  // select all airlines, selected-airline selected-airport (filter airlines to valid, don't touch filtered airports)

  // select single airport, all-airlines all-airports (filter airports to selected, filter airlines to valid)
  // select single airport, selected-airline all-airports (filter airports to selected, don't touch filtered airlines)
  // select all airports, all-airlines selected-airport (filter airport to all, filter airlines to all)
  // select all airports, select-airline selected-airport (filter airports to valid, don't touch filtered airlines)


  const selectAirline = (e) => {
    setAirlineSelected(e.target.value !== "0");

    const selectedAirlines = e.target.value === "0" && !airportSelected ?
      data.airlines :
      filterAirlines(e.target.value, filtered.airports);
    const selectedAirports = airportSelected ?
      filtered.airports :
      filterAirports(null, selectedAirlines);
    const selectedRoutes = filterRoutes(selectedAirlines, selectedAirports);
    
    setFiltered({
      routes: selectedRoutes,
      airlines: selectedAirlines,
      airports: selectedAirports,
    });
  };

  const selectAirport = (e) => {
    setAirportSelected(e.target.value !== 'all');

    const selectedAirports = e.target.value === "all" && !airlineSelected ?
      data.airports :
      filterAirports(e.target.value, filtered.airlines);
    const selectedAirlines = airlineSelected ?
      filtered.airlines :
      filterAirlines(null, selectedAirports);
    const selectedRoutes = filterRoutes(selectedAirlines, selectedAirports);
    
    setFiltered({
      routes: selectedRoutes,
      airlines: selectedAirlines,
      airports: selectedAirports,
    });
  };

  const filterAirlines = (selectedAirline, selectedAirports) => {
    if (selectedAirline === null || selectedAirline === "0") {
      return data.airlines.filter(airline => {
        return data.routes.some(route => {
          return route.airline === airline.id &&
            usesFilteredAirport(route, selectedAirports);
        });
      });
    } else {
      return data.airlines.filter(airline => {
        return airline.id === Number(selectedAirline);
      });
    }
  };

  const filterAirports = (selectedAirport, selectedAirlines) => {
    if (selectedAirport === null || selectedAirport === 'all') {
      return data.airports.filter(airport => {
        return data.routes.some(route => {
          return [route.src, route.dest].includes(airport.code) &&
            usesFilteredAirline(route, selectedAirlines);
        });
      });
    } else {
      return data.airports.filter(airport => {
        return airport.code === selectedAirport;
      });
    }
  };

  const filterRoutes = (selectedAirlines, selectedAirports) => {
    return data.routes.filter(route => {      
      return usesFilteredAirport(route, selectedAirports) &&
        usesFilteredAirline(route, selectedAirlines);
    });
  };

  const usesFilteredAirline = (route, airlines) => {
    return airlines.some(airline => {
      return airline.id === route.airline;
    });
  };

  const usesFilteredAirport = (route, airports) => {
    return airports.some(airport => {
      return [route.src, route.dest].includes(airport.code);
    });    
  };

  return (
    <div className="app">
    <header className="header">
      <h1 className="title">Airline Routes</h1>
    </header>
    <section>
      <label>Show routes on</label>
      <Select options={data.airlines} valueKey="id" titleKey="name"
        allTitle="All Airlines" value="0" onSelect={selectAirline}
        selectable={filtered.airlines} />
      <Select options={data.airports} valueKey="code" titleKey="name"
        allTitle="All Airports" value="all" onSelect={selectAirport}
        selectable={filtered.airports} />
      <Table className="routes-table" columns={columns} rows={filtered.routes}
        perPage={25} format={formatValue} />
    </section>
  </div>
  );
};

export default App;