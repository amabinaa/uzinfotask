import React, { useState } from "react";
import "./Table.css";

const Table = ({ counts, onUpdateCount }) => {
  const [sortOrder, setSortOrder] = useState("asc");

  const sortData = (column) => {
    const sortedData = [...counts].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    onUpdateCount(sortedData);
  };

  const totalCount = counts.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th onClick={() => sortData("user")}>User ⬍</th>
            <th onClick={() => sortData("category")}>Category ⬍</th>
            <th onClick={() => sortData("count")}>Count ⬍</th>
          </tr>
        </thead>
        <tbody>
          {counts.length > 0 ? (
            counts.map((item, index) => (
              <tr key={index}>
                <td>{item.user}</td>
                <td>{item.category}</td>
                <td>{item.count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Data Available</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">
              <strong>Total</strong>
            </td>
            <td>
              <strong>{totalCount}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
