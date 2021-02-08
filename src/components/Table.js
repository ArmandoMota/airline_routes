import React from 'react';
import data from '../data';

const Table = ({ className, columns, rows, format }) => {

  return (
    <table className={className}>
      <thead>
        <tr>
          {columns.map(({ name }) => <th key={name}>{name}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.routes.map(route => (
          <tr key={`${route.airline}${route.src}${route.dest}`}>
            <td>{format('airline', route.airline)}</td>
            <td>{format('src', route.src)}</td>
            <td>{format('dest', route.dest)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;