import React, { useState, useEffect } from 'react';

const Table = ({ className, columns, rows, perPage, format }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [stopIndex, setStopIndex] = useState(perPage);
  const [previousClass, setPreviousClass] = useState('enabled');
  const [nextClass, setNextClass] = useState('enabled');

  const routesToDisplay = rows.slice(startIndex, stopIndex);
  const totalRoutes = rows.length;

  useEffect(() => {
    if (startIndex <= 0) {
      setPreviousClass('disabled');
    } else {
      setPreviousClass('enabled');
    }

    if (stopIndex >= totalRoutes) {
      setNextClass('disabled');
    } else {
      setNextClass('enabled');
    }
  }, [startIndex, stopIndex, totalRoutes]);

  const previousHandler = (e) => {
    const newStart = startIndex < perPage ? 0 : startIndex - perPage;
    const newStop = stopIndex <= perPage ? perPage : stopIndex - perPage;
    setStartIndex(newStart);
    setStopIndex(newStop);
  };

  const nextHandler = (e) => {
    const newStart = (startIndex + perPage) >= totalRoutes ?
      startIndex :
      startIndex + perPage;
      
    const newStop = (stopIndex + perPage) > totalRoutes ?
      totalRoutes :
      stopIndex + perPage;

    setStartIndex(newStart);
    setStopIndex(newStop);
  };

  return (
    <>
      <table className={className}>
        <thead>
          <tr>
            {columns.map(({ name }) => <th key={name}>{name}</th>)}
          </tr>
        </thead>
        <tbody>
          {routesToDisplay.map(route => (
            <tr key={`${route.airline}${route.src}${route.dest}`}>
              <td>{format('airline', route.airline)}</td>
              <td>{format('src', route.src)}</td>
              <td>{format('dest', route.dest)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <p>
          Showing {`${startIndex + 1}-${stopIndex}`} routes of {totalRoutes} total routes
        </p>
        <button className={previousClass} onClick={previousHandler}>Previous Page</button>
        <button className={nextClass} onClick={nextHandler}>Next Page</button>
      </div>
    </>
  );
};

export default Table;