import React, { useState, useEffect } from 'react';

const Table = ({ className, columns, rows, perPage, format }) => {
  const [indices, setIndices] = useState({ start: 0, stop: perPage });
  const [previousClass, setPreviousClass] = useState('enabled');
  const [nextClass, setNextClass] = useState('enabled');
  const routesToDisplay = rows.slice(indices.start, indices.stop);
  const totalRoutes = rows.length;

  useEffect(() => {
    if (indices.start <= 0) {
      setPreviousClass('disabled');
    } else {
      setPreviousClass('enabled');
    }

    if (indices.stop >= totalRoutes) {
      setNextClass('disabled'); 
    } else {
      setNextClass('enabled');
    }
  }, [indices, totalRoutes]);

  const previousHandler = (e) => {
    const start = indices.start < perPage ? 0 : indices.start - perPage;
    const stop = indices.stop <= perPage ? perPage : indices.stop - perPage;
    setIndices({ start, stop })
  };

  const nextHandler = (e) => {
    const start = (indices.start + perPage) >= totalRoutes ?
      indices.start :
      indices.start + perPage;
      
    const stop = (indices.stop + perPage) > totalRoutes ?
      totalRoutes :
      indices.stop + perPage;

    setIndices({ start, stop });
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
          Showing {`${indices.start + 1}-${Math.min(indices.stop, rows.length)}`} routes of {totalRoutes} total routes
        </p>
        <button className={previousClass} onClick={previousHandler}>Previous Page</button>
        <button className={nextClass} onClick={nextHandler}>Next Page</button>
      </div>
    </>
  );
};

export default Table;