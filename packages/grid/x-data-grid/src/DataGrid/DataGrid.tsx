import * as React from 'react';
import PropTypes from 'prop-types';
import { chainPropTypes } from '@mui/utils';
import {
  GridBody,
  GridErrorHandler,
  GridFooterPlaceholder,
  GridHeaderPlaceholder,
  GridRoot,
} from '../components';
import { DataGridProps } from '../models/props/DataGridProps';
import { GridContextProvider } from '../context/GridContextProvider';
import { useDataGridComponent } from './useDataGridComponent';
import { useDataGridProps, MAX_PAGE_SIZE } from './useDataGridProps';
import { DataGridVirtualScroller } from '../components/DataGridVirtualScroller';
import { DataGridColumnHeaders } from '../components/DataGridColumnHeaders';

const DataGridRaw = React.forwardRef<HTMLDivElement, DataGridProps>(function DataGrid(
  inProps,
  ref,
) {
  const props = useDataGridProps(inProps);
  const apiRef = useDataGridComponent(props);

  return (
    <GridContextProvider apiRef={apiRef} props={props}>
      <GridRoot className={props.className} style={props.style} sx={props.sx} ref={ref}>
        <GridErrorHandler>
          <GridHeaderPlaceholder />
          <GridBody
            ColumnHeadersComponent={DataGridColumnHeaders}
            VirtualScrollerComponent={DataGridVirtualScroller}
          />
          <GridFooterPlaceholder />
        </GridErrorHandler>
      </GridRoot>
    </GridContextProvider>
  );
});

export const DataGrid = React.memo(DataGridRaw);

DataGridRaw.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The label of the grid.
   */
  'aria-label': PropTypes.string,
  /**
   * The id of the element containing a label for the grid.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * If `true`, the grid height is dynamic and follow the number of rows in the grid.
   * @default false
   */
  autoHeight: PropTypes.bool,
  /**
   * If `true`, the pageSize is calculated according to the container size and the max number of rows to avoid rendering a vertical scroll bar.
   * @default false
   */
  autoPageSize: PropTypes.bool,
  /**
   * If `true`, the grid get a first column with a checkbox that allows to select rows.
   * @default false
   */
  checkboxSelection: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * Number of extra columns to be rendered before/after the visible slice.
   * @default 3
   */
  columnBuffer: PropTypes.number,
  /**
   * Set of columns of type [[GridColumns]].
   */
  columns: chainPropTypes(PropTypes.array.isRequired, (props) => {
    // @ts-ignore because otherwise `build:api` doesn't work
    if (props.columns && props.columns.some((column) => column.resizable)) {
      return new Error(
        [
          `MUI: \`column.resizable = true\` is not a valid prop.`,
          'Column resizing is not available in the MIT version.',
          '',
          'You need to upgrade to the DataGridPro component to unlock this feature.',
        ].join('\n'),
      );
    }
    return null;
  }),
  /**
   * Number of rows from the `columnBuffer` that can be visible before a new slice is rendered.
   * @default 3
   */
  columnThreshold: PropTypes.number,
  /**
   * Extend native column types with your new column types.
   */
  columnTypes: PropTypes.object,
  /**
   * Set the column visibility model of the grid.
   * If defined, the grid will ignore the `hide` property in [[GridColDef]].
   */
  columnVisibilityModel: PropTypes.object,
  /**
   * Overrideable components.
   */
  components: PropTypes.object,
  /**
   * Overrideable components props dynamically passed to the component at rendering.
   */
  componentsProps: PropTypes.object,
  /**
   * Set the density of the grid.
   * @default "standard"
   */
  density: PropTypes.oneOf(['comfortable', 'compact', 'standard']),
  /**
   * If `true`, column filters are disabled.
   * @default false
   */
  disableColumnFilter: PropTypes.bool,
  /**
   * If `true`, the column menu is disabled.
   * @default false
   */
  disableColumnMenu: PropTypes.bool,
  /**
   * If `true`, hiding/showing columns is disabled.
   * @default false
   */
  disableColumnSelector: PropTypes.bool,
  /**
   * If `true`, the density selector is disabled.
   * @default false
   */
  disableDensitySelector: PropTypes.bool,
  /**
   * If `true`, rows will not be extended to fill the full width of the grid container.
   * @default false
   */
  disableExtendRowFullWidth: PropTypes.bool,
  /**
   * If `true`, the selection on click on a row or cell is disabled.
   * @default false
   */
  disableSelectionOnClick: PropTypes.bool,
  /**
   * If `true`, the virtualization is disabled.
   * @default false
   */
  disableVirtualization: PropTypes.bool,
  /**
   * Controls whether to use the cell or row editing.
   * @default "cell"
   */
  editMode: PropTypes.oneOf(['cell', 'row']),
  /**
   * Set the edit rows model of the grid.
   */
  editRowsModel: PropTypes.object,
  /**
   * An error that will turn the grid into its error state and display the error component.
   */
  error: PropTypes.any,
  /**
   * Features under development.
   * For each feature, if the flag is not explicitly set to `true`, the feature will be fully disabled and any property / method call will not have any effect.
   */
  experimentalFeatures: PropTypes.shape({
    newEditingApi: PropTypes.bool,
    preventCommitWhileValidating: PropTypes.bool,
    warnIfFocusStateIsNotSynced: PropTypes.bool,
  }),
  /**
   * Filtering can be processed on the server or client-side.
   * Set it to 'server' if you would like to handle filtering on the server-side.
   * @default "client"
   */
  filterMode: PropTypes.oneOf(['client', 'server']),
  /**
   * Set the filter model of the grid.
   */
  filterModel: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        columnField: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        operatorValue: PropTypes.string,
        value: PropTypes.any,
      }),
    ).isRequired,
    linkOperator: PropTypes.oneOf(['and', 'or']),
  }),
  /**
   * Function that applies CSS classes dynamically on cells.
   * @param {GridCellParams} params With all properties from [[GridCellParams]].
   * @returns {string} The CSS class to apply to the cell.
   */
  getCellClassName: PropTypes.func,
  /**
   * Function that returns the element to render in row detail.
   * @param {GridRowParams} params With all properties from [[GridRowParams]].
   * @returns {JSX.Element} The row detail element.
   */
  getDetailPanelContent: PropTypes.func,
  /**
   * Function that applies CSS classes dynamically on rows.
   * @param {GridRowClassNameParams} params With all properties from [[GridRowClassNameParams]].
   * @returns {string} The CSS class to apply to the row.
   */
  getRowClassName: PropTypes.func,
  /**
   * Function that sets the row height per row.
   * @param {GridRowHeightParams} params With all properties from [[GridRowHeightParams]].
   * @returns {GridRowHeightReturnValue} The row height value. If `null` or `undefined` then the default row height is applied.
   */
  getRowHeight: PropTypes.func,
  /**
   * Return the id of a given [[GridRowModel]].
   */
  getRowId: PropTypes.func,
  /**
   * Function that allows to specify the spacing between rows.
   * @param {GridRowSpacingParams} params With all properties from [[GridRowSpacingParams]].
   * @returns {GridRowSpacing} The row spacing values.
   */
  getRowSpacing: PropTypes.func,
  /**
   * Set the height in pixel of the column headers in the grid.
   * @default 56
   */
  headerHeight: PropTypes.number,
  /**
   * If `true`, the footer component is hidden.
   * @default false
   */
  hideFooter: PropTypes.bool,
  /**
   * If `true`, the pagination component in the footer is hidden.
   * @default false
   */
  hideFooterPagination: PropTypes.bool,
  /**
   * If `true`, the selected row count in the footer is hidden.
   * @default false
   */
  hideFooterSelectedRowCount: PropTypes.bool,
  /**
   * The initial state of the DataGrid.
   * The data in it will be set in the state on initialization but will not be controlled.
   * If one of the data in `initialState` is also being controlled, then the control state wins.
   */
  initialState: PropTypes.object,
  /**
   * Callback fired when a cell is rendered, returns true if the cell is editable.
   * @param {GridCellParams} params With all properties from [[GridCellParams]].
   * @returns {boolean} A boolean indicating if the cell is editable.
   */
  isCellEditable: PropTypes.func,
  /**
   * Determines if a row can be selected.
   * @param {GridRowParams} params With all properties from [[GridRowParams]].
   * @returns {boolean} A boolean indicating if the cell is selectable.
   */
  isRowSelectable: PropTypes.func,
  /**
   * If `true`, a  loading overlay is displayed.
   */
  loading: PropTypes.bool,
  /**
   * Set the locale text of the grid.
   * You can find all the translation keys supported in [the source](https://github.com/mui/mui-x/blob/HEAD/packages/grid/x-data-grid/src/constants/localeTextConstants.ts) in the GitHub repository.
   */
  localeText: PropTypes.object,
  /**
   * Pass a custom logger in the components that implements the [[Logger]] interface.
   * @default console
   */
  logger: PropTypes.shape({
    debug: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
    info: PropTypes.func.isRequired,
    warn: PropTypes.func.isRequired,
  }),
  /**
   * Allows to pass the logging level or false to turn off logging.
   * @default "debug"
   */
  logLevel: PropTypes.oneOf(['debug', 'error', 'info', 'warn', false]),
  /**
   * Nonce of the inline styles for [Content Security Policy](https://www.w3.org/TR/2016/REC-CSP2-20161215/#script-src-the-nonce-attribute).
   */
  nonce: PropTypes.string,
  /**
   * Callback fired when any cell is clicked.
   * @param {GridCellParams} params With all properties from [[GridCellParams]].
   * @param {MuiEvent<React.MouseEvent>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onCellClick: PropTypes.func,
  /**
   * Callback fired when a double click event comes from a cell element.
   * @param {GridCellParams} params With all properties from [[GridCellParams]].
   * @param {MuiEvent<React.MouseEvent>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onCellDoubleClick: PropTypes.func,
  /**
   * Callback fired when the cell changes are committed.
   * @param {GridCellEditCommitParams} params With all properties from [[GridCellEditCommitParams]].
   * @param {MuiEvent<MuiBaseEvent>} event The event that caused this prop to be called.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onCellEditCommit: PropTypes.func,
  /**
   * Callback fired when the cell turns to edit mode.
   * @param {GridCellParams} params With all properties from [[GridCellParams]].
   * @param {MuiEvent<React.KeyboardEvent | React.MouseEvent>} event The event that caused this prop to be called.
   */
  onCellEditStart: PropTypes.func,
  /**
   * Callback fired when the cell turns to view mode.
   * @param {GridCellParams} params With all properties from [[GridCellParams]].
   * @param {MuiEvent<MuiBaseEvent>} event The event that caused this prop to be called.
   */
  onCellEditStop: PropTypes.func,
  /**
   * Callback fired when a cell loses focus.
   * @param {GridCellParams} params With all properties from [[GridCellParams]].
   * @param {MuiEvent<MuiBaseEvent>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onCellFocusOut: PropTypes.func,
  /**
   * Callback fired when a keydown event comes from a cell element.
   * @param {GridCellParams} params With all properties from [[GridCellParams]].
   * @param {MuiEvent<React.KeyboardEvent>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onCellKeyDown: PropTypes.func,
  /**
   * Callback fired when a click event comes from a column header element.
   * @param {GridColumnHeaderParams} params With all properties from [[GridColumnHeaderParams]].
   * @param {MuiEvent<React.MouseEvent>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onColumnHeaderClick: PropTypes.func,
  /**
   * Callback fired when a double click event comes from a column header element.
   * @param {GridColumnHeaderParams} params With all properties from [[GridColumnHeaderParams]].
   * @param {MuiEvent<React.MouseEvent>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onColumnHeaderDoubleClick: PropTypes.func,
  /**
   * Callback fired when a mouse enter event comes from a column header element.
   * @param {GridColumnHeaderParams} params With all properties from [[GridColumnHeaderParams]].
   * @param {MuiEvent<React.MouseEvent>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onColumnHeaderEnter: PropTypes.func,
  /**
   * Callback fired when a mouse leave event comes from a column header element.
   * @param {GridColumnHeaderParams} params With all properties from [[GridColumnHeaderParams]].
   * @param {MuiEvent<React.MouseEvent>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onColumnHeaderLeave: PropTypes.func,
  /**
   * Callback fired when a mouseout event comes from a column header element.
   * @param {GridColumnHeaderParams} params With all properties from [[GridColumnHeaderParams]].
   * @param {MuiEvent<React.MouseEvent>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onColumnHeaderOut: PropTypes.func,
  /**
   * Callback fired when a mouseover event comes from a column header element.
   * @param {GridColumnHeaderParams} params With all properties from [[GridColumnHeaderParams]].
   * @param {MuiEvent<React.MouseEvent>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onColumnHeaderOver: PropTypes.func,
  /**
   * Callback fired when a column is reordered.
   * @param {GridColumnOrderChangeParams} params With all properties from [[GridColumnOrderChangeParams]].
   * @param {MuiEvent<{}>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onColumnOrderChange: PropTypes.func,
  /**
   * Callback fired when a column visibility changes.
   * Only works when no `columnVisibilityModel` is provided and if we change the visibility of a single column at a time.
   * @param {GridColumnVisibilityChangeParams} params With all properties from [[GridColumnVisibilityChangeParams]].
   * @param {MuiEvent<{}>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   * @deprecated Use `onColumnVisibilityModelChange` instead.
   */
  onColumnVisibilityChange: PropTypes.func,
  /**
   * Callback fired when the column visibility model changes.
   * @param {GridColumnVisibilityModel} model The new model.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onColumnVisibilityModelChange: PropTypes.func,
  /**
   * Callback fired when the edit cell value changes.
   * @param {GridEditCellPropsParams} params With all properties from [[GridEditCellPropsParams]].
   * @param {MuiEvent<React.SyntheticEvent>} event The event that caused this prop to be called.
   * @param {GridCallbackDetails} details Additional details for this callback.
   * @deprecated use `preProcessEditCellProps` from the [`GridColDef`](/api/data-grid/grid-col-def/)
   */
  onEditCellPropsChange: PropTypes.func,
  /**
   * Callback fired when the `editRowsModel` changes.
   * @param {GridEditRowsModel} editRowsModel With all properties from [[GridEditRowsModel]].
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onEditRowsModelChange: PropTypes.func,
  /**
   * Callback fired when an exception is thrown in the grid.
   * @param {any} args The arguments passed to the `showError` call.
   * @param {MuiEvent<{}>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onError: PropTypes.func,
  /**
   * Callback fired when the Filter model changes before the filters are applied.
   * @param {GridFilterModel} model With all properties from [[GridFilterModel]].
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onFilterModelChange: PropTypes.func,
  /**
   * Callback fired when the current page has changed.
   * @param {number} page Index of the page displayed on the Grid.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onPageChange: PropTypes.func,
  /**
   * Callback fired when the page size has changed.
   * @param {number} pageSize Size of the page displayed on the Grid.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onPageSizeChange: PropTypes.func,
  /**
   * Callback fired when the grid is resized.
   * @param {ElementSize} containerSize With all properties from [[ElementSize]].
   * @param {MuiEvent<{}>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onResize: PropTypes.func,
  /**
   * Callback fired when a row is clicked.
   * Not called if the target clicked is an interactive element added by the built-in columns.
   * @param {GridRowParams} params With all properties from [[GridRowParams]].
   * @param {MuiEvent<React.MouseEvent>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onRowClick: PropTypes.func,
  /**
   * Callback fired when a double click event comes from a row container element.
   * @param {GridRowParams} params With all properties from [[RowParams]].
   * @param {MuiEvent<React.MouseEvent>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onRowDoubleClick: PropTypes.func,
  /**
   * Callback fired when the row changes are committed.
   * @param {GridRowId} id The row id.
   * @param {MuiEvent<MuiBaseEvent>} event The event that caused this prop to be called.
   */
  onRowEditCommit: PropTypes.func,
  /**
   * Callback fired when the row turns to edit mode.
   * @param {GridRowParams} params With all properties from [[GridRowParams]].
   * @param {MuiEvent<React.KeyboardEvent | React.MouseEvent>} event The event that caused this prop to be called.
   */
  onRowEditStart: PropTypes.func,
  /**
   * Callback fired when the row turns to view mode.
   * @param {GridRowParams} params With all properties from [[GridRowParams]].
   * @param {MuiEvent<MuiBaseEvent>} event The event that caused this prop to be called.
   */
  onRowEditStop: PropTypes.func,
  /**
   * Callback fired when the selection state of one or multiple rows changes.
   * @param {GridSelectionModel} selectionModel With all the row ids [[GridSelectionModel]].
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onSelectionModelChange: PropTypes.func,
  /**
   * Callback fired when the sort model changes before a column is sorted.
   * @param {GridSortModel} model With all properties from [[GridSortModel]].
   * @param {GridCallbackDetails} details Additional details for this callback.
   */
  onSortModelChange: PropTypes.func,
  /**
   * Callback fired when the state of the grid is updated.
   * @param {GridState} state The new state.
   * @param {MuiEvent<{}>} event The event object.
   * @param {GridCallbackDetails} details Additional details for this callback.
   * @internal
   */
  onStateChange: PropTypes.func,
  /**
   * The zero-based index of the current page.
   * @default 0
   */
  page: PropTypes.number,
  /**
   * Set the number of rows in one page.
   * If some of the rows have children (for instance in the tree data), this number represents the amount of top level rows wanted on each page.
   * @default 100
   */
  pageSize: chainPropTypes(PropTypes.number, (props: any) => {
    if (props.pageSize && props.pageSize > MAX_PAGE_SIZE) {
      return new Error(
        [
          `MUI: \`<DataGrid pageSize={${props.pageSize}} />\` is not a valid prop.`,
          `Only page size below ${MAX_PAGE_SIZE} is available in the MIT version.`,
          '',
          'You need to upgrade to the DataGridPro component to unlock this feature.',
        ].join('\n'),
      );
    }
    return null;
  }),
  pagination: (props: any) => {
    if (props.pagination === false) {
      return new Error(
        [
          'MUI: `<DataGrid pagination={false} />` is not a valid prop.',
          'Infinite scrolling is not available in the MIT version.',
          '',
          'You need to upgrade to the DataGridPro component to disable the pagination.',
        ].join('\n'),
      );
    }
    return null;
  },
  /**
   * Pagination can be processed on the server or client-side.
   * Set it to 'client' if you would like to handle the pagination on the client-side.
   * Set it to 'server' if you would like to handle the pagination on the server-side.
   * @default "client"
   */
  paginationMode: PropTypes.oneOf(['client', 'server']),
  /**
   * Callback called before updating a row with new values in the row and cell editing.
   * Only applied if `props.experimentalFeatures.newEditingApi: true`.
   * @param {GridRowModel} newRow Row object with the new values.
   * @param {GridRowModel} oldRow Row object with the old values.
   * @returns {Promise<GridRowModel> | GridRowModel} The final values to update the row.
   */
  processRowUpdate: PropTypes.func,
  /**
   * Number of extra rows to be rendered before/after the visible slice.
   * @default 3
   */
  rowBuffer: PropTypes.number,
  /**
   * Set the total number of rows, if it is different from the length of the value `rows` prop.
   * If some rows have children (for instance in the tree data), this number represents the amount of top level rows.
   */
  rowCount: PropTypes.number,
  /**
   * Set the height in pixel of a row in the grid.
   * @default 52
   */
  rowHeight: PropTypes.number,
  /**
   * Set of rows of type [[GridRowsProp]].
   */
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Sets the type of space between rows added by `getRowSpacing`.
   * @default "margin"
   */
  rowSpacingType: PropTypes.oneOf(['border', 'margin']),
  /**
   * Select the pageSize dynamically using the component UI.
   * @default [25, 50, 100]
   */
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  /**
   * Number of rows from the `rowBuffer` that can be visible before a new slice is rendered.
   * @default 3
   */
  rowThreshold: PropTypes.number,
  /**
   * Override the height/width of the grid inner scrollbar.
   */
  scrollbarSize: PropTypes.number,
  /**
   * Set the selection model of the grid.
   */
  selectionModel: chainPropTypes(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
    (props: any) => {
      if (
        !props.checkboxSelection &&
        Array.isArray(props.selectionModel) &&
        props.selectionModel.length > 1
      ) {
        return new Error(
          [
            `MUI: \`<DataGrid selectionModel={${JSON.stringify(
              props.selectionModel,
            )}} />\` is not a valid prop.`,
            'selectionModel can only be of 1 item in DataGrid.',
            '',
            'You need to upgrade to the DataGridPro component to unlock multiple selection.',
          ].join('\n'),
        );
      }
      return null;
    },
  ),
  /**
   * If `true`, the right border of the cells are displayed.
   * @default false
   */
  showCellRightBorder: PropTypes.bool,
  /**
   * If `true`, the right border of the column headers are displayed.
   * @default false
   */
  showColumnRightBorder: PropTypes.bool,
  /**
   * Sorting can be processed on the server or client-side.
   * Set it to 'client' if you would like to handle sorting on the client-side.
   * Set it to 'server' if you would like to handle sorting on the server-side.
   * @default "client"
   */
  sortingMode: PropTypes.oneOf(['client', 'server']),
  /**
   * The order of the sorting sequence.
   * @default ['asc', 'desc', null]
   */
  sortingOrder: PropTypes.arrayOf(PropTypes.oneOf(['asc', 'desc'])),
  /**
   * Set the sort model of the grid.
   */
  sortModel: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      sort: PropTypes.oneOf(['asc', 'desc']),
    }),
  ),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;
