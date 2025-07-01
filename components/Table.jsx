import React from 'react';

/**
 * Table component
 * @param {Array} columns - Array of column definitions: { key, title, className, renderHeader? }
 * @param {Array} data - Array of row data objects
 * @param {string|function} rowKey - Unique key for each row (string or function)
 * @param {function} renderRow - Function to render a row: (row, index) => ReactNode[]
 * @param {string} className - Optional table className
 */
const Table = ({ columns, data, rowKey, renderRow, className = '' }) => {
  return (
    <div className="bg-white rounded-xl p-6 mt-5">
      <table className={`min-w-full ${className}`}>
        <thead className="text-left text-[#464646] font-normal">
          <tr className="border-b-[2px] border-[#EFF2F7]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`py-4 px-5 ${col.className || ''}`}
              >
                {col.renderHeader ? col.renderHeader() : col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={typeof rowKey === 'function' ? rowKey(row) : row[rowKey] || idx}>
              {renderRow(row, idx)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table; 