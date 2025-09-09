
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
    <div className="bg-white rounded-lg shadow-sm border border-neutral-medium/20 overflow-hidden">
      <h3 className="text-xl font-bold p-6 text-neutral-dark">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-medium/20">
          <thead className="bg-background">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-neutral-medium uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-medium/20">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-background">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">
                    {col.accessor(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
         {data.length === 0 && (
            <div className="text-center py-10 text-neutral-medium">No data available.</div>
        )}
      </div>
    </div>
  );
};

export default DataTable;