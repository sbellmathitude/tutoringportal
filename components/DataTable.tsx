
import React from 'react';

interface DataTableProps<T,> {
  columns: {
    header: string;
    accessor: (row: T) => React.ReactNode;
  }[];
  data: T[];
  title: string;
}

const DataTable = <T,>({ columns, data, title }: DataTableProps<T>) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h3 className="text-xl font-semibold p-6 text-neutral-dark">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {col.accessor(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
         {data.length === 0 && (
            <div className="text-center py-10 text-gray-500">No data available.</div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
