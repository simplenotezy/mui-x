import * as React from 'react';
import { GridRowsProp, DataGrid, GridSortModel } from '@mui/x-data-grid';
import { useDemoData, GridDemoData } from '@mui/x-data-grid-generator';

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

function loadServerRows(sortModel: GridSortModel, data: GridDemoData): Promise<any> {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      if (sortModel.length === 0) {
        resolve(data.rows);
        return;
      }

      const sortedColumn = sortModel[0];

      let sortedRows = [...data.rows].sort((a, b) =>
        String(a[sortedColumn.field]).localeCompare(String(b[sortedColumn.field])),
      );

      if (sortModel[0].sort === 'desc') {
        sortedRows = sortedRows.reverse();
      }

      resolve(sortedRows);
    }, Math.random() * 500 + 100); // simulate network latency
  });
}

export default function ServerSortingGrid() {
  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    { field: 'rating', sort: 'asc' },
  ]);
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSortModelChange = (newModel: GridSortModel) => {
    setSortModel(newModel);
  };

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await loadServerRows(sortModel, data);

      if (!active) {
        return;
      }

      setRows(newRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [sortModel, data]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={data.columns}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        loading={loading}
      />
    </div>
  );
}
