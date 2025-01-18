import React from "react";

const DynamicTable = ({ columns, data }: { columns: any[]; data: any[] }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns?.map((column, icolumn) => {
              return (
                <th key={icolumn} className={column?.thClassName ?? ""}>
                  {column?.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((rowValue, irow) => {
            return (
              <tr key={irow}>
                {columns?.map((column, icolumn) => {
                  return (
                    <td
                      key={irow + icolumn}
                      className={column?.tdClassName ?? ""}
                    >
                      {column?.customRender
                        ? column?.customRender(column, rowValue, data)
                        : rowValue[column?.fieldName]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
