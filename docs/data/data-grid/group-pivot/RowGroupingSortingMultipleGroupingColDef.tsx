import * as React from 'react';
import {
  DataGridPro,
  GridApi,
  GridColumns,
  gridColumnVisibilityModelSelector,
  GridEvents,
  GridRowGroupingModel,
  useGridApiRef,
} from '@mui/x-data-grid-pro';
import { useMovieData } from '@mui/x-data-grid-generator';

const INITIAL_GROUPING_COLUMN_MODEL = ['company', 'director'];

const useKeepGroupingColumnsHidden = (
  apiRef: React.MutableRefObject<GridApi>,
  columns: GridColumns,
  initialModel: GridRowGroupingModel,
  leafField?: string,
) => {
  const prevModel = React.useRef(initialModel);

  React.useEffect(() => {
    apiRef.current.subscribeEvent(GridEvents.rowGroupingModelChange, (newModel) => {
      const columnVisibilityModel = {
        ...gridColumnVisibilityModelSelector(apiRef),
      };
      newModel.forEach((field) => {
        if (!prevModel.current.includes(field)) {
          columnVisibilityModel[field] = false;
        }
      });
      prevModel.current.forEach((field) => {
        if (!newModel.includes(field)) {
          columnVisibilityModel[field] = true;
        }
      });
      apiRef.current.setColumnVisibilityModel(columnVisibilityModel);
      prevModel.current = newModel;
    });
  }, [apiRef]);

  return React.useMemo(
    () =>
      columns.map((colDef) =>
        initialModel.includes(colDef.field) ||
        (leafField && colDef.field === leafField)
          ? { ...colDef, hide: true }
          : colDef,
      ),
    [columns, initialModel, leafField],
  );
};

export default function RowGroupingSortingMultipleGroupingColDef() {
  const data = useMovieData();
  const apiRef = useGridApiRef();

  const columns = useKeepGroupingColumnsHidden(
    apiRef,
    data.columns,
    INITIAL_GROUPING_COLUMN_MODEL,
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGridPro
        {...data}
        apiRef={apiRef}
        columns={columns}
        disableSelectionOnClick
        defaultGroupingExpansionDepth={-1}
        initialState={{
          rowGrouping: {
            model: INITIAL_GROUPING_COLUMN_MODEL,
          },
        }}
        rowGroupingColumnMode="multiple"
        groupingColDef={(params) =>
          params.fields.includes('director')
            ? {
                leafField: 'title',
                mainGroupingCriteria: 'director',
              }
            : {}
        }
        experimentalFeatures={{
          rowGrouping: true,
        }}
      />
    </div>
  );
}
