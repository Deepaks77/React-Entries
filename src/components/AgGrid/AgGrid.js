import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
const AgGrid = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [selectedRow, setSelectedRow] = useState({});

  const [rowData, setRowData] = useState([]);
  const onGridReady = (params) => {
    console.log(gridColumnApi);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };
  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);
  const defaultColDef = {
    resizable: true,
    editable: true,
    flex: 1,
  };

  const onSelectionChanged = () => {
    const selectedRows = gridApi.getSelectedRows();
    console.log(selectedRows[0]);
    console.log(selectedRow);
    setSelectedRow(selectedRows[0]);
  };
  const onExportClick = () => {
    const exportParams = {
      skipHeader: false,
      skipFooters: true,
      allColumns: true,
      onlySelected: false,
      suppressQuotes: true,
      fileName: "test2.csv",
      columnSeparator: ",",
    };
    gridApi.exportDataAsCsv(exportParams);
  };

  return (
    <div>
      <button onClick={onExportClick}>export</button>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
          rowSelection="single"
          onSelectionChanged={onSelectionChanged}
          pagination={true}
        >
          <AgGridColumn field="make" sortable={true} filter={true} />
          <AgGridColumn
            field="model"
            sortable={true}
            filter={true}
            sizeColumnsToFit
          />
          <AgGridColumn
            field="price"
            sortable={true}
            filter={true}
            sizeColumnsToFit
          />
        </AgGridReact>
      </div>
    </div>
  );
};

export default AgGrid;
