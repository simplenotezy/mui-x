/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { GridRowEventLookup, GridEvents } from '../models/events';
import { GridRowId, GridRowModel } from '../models/gridRows';
import {
  GridEditModes,
  GridRowModes,
  GridEditRowsModel,
  GridCellModes,
} from '../models/gridEditRowModel';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { getDataGridUtilityClass, gridClasses } from '../constants/gridClasses';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { DataGridProcessedProps } from '../models/props/DataGridProps';
import { GridStateColDef } from '../models/colDef/gridColDef';
import { GridCellIdentifier } from '../hooks/features/focus/gridFocusState';
import { gridColumnsTotalWidthSelector } from '../hooks/features/columns/gridColumnsSelector';
import { useGridSelector } from '../hooks/utils/useGridSelector';
import { GridRowClassNameParams } from '../models/params/gridRowParams';
import { useGridVisibleRows } from '../hooks/utils/useGridVisibleRows';
import { findParentElementFromClassName } from '../utils/domUtils';
import { GRID_CHECKBOX_SELECTION_COL_DEF } from '../colDef/gridCheckboxSelectionColDef';
import { GRID_ACTIONS_COLUMN_TYPE } from '../colDef/gridActionsColDef';

export interface GridRowProps {
  rowId: GridRowId;
  selected: boolean;
  index: number;
  rowHeight: number;
  containerWidth: number;
  row: GridRowModel;
  firstColumnToRender: number;
  lastColumnToRender: number;
  visibleColumns: GridStateColDef[];
  renderedColumns: GridStateColDef[];
  cellFocus: GridCellIdentifier | null;
  cellTabIndex: GridCellIdentifier | null;
  editRowsState: GridEditRowsModel;
  isLastVisible?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

type OwnerState = Pick<GridRowProps, 'selected'> & {
  editable: boolean;
  editing: boolean;
  isLastVisible: boolean;
  classes?: DataGridProcessedProps['classes'];
};

const useUtilityClasses = (ownerState: OwnerState) => {
  const { editable, editing, selected, isLastVisible, classes } = ownerState;
  const slots = {
    root: [
      'row',
      selected && 'selected',
      editable && 'row--editable',
      editing && 'row--editing',
      isLastVisible && 'row--lastVisible',
    ],
  };

  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const EmptyCell = ({ width, height }: { width: number; height: number }) => {
  if (!width || !height) {
    return null;
  }

  const style = { width, height };

  return <div className="MuiDataGrid-cell" style={style} />; // TODO change to .MuiDataGrid-emptyCell or .MuiDataGrid-rowFiller
};

function GridRow(props: React.HTMLAttributes<HTMLDivElement> & GridRowProps) {
  const {
    selected,
    rowId,
    row,
    index,
    style: styleProp,
    rowHeight,
    className,
    visibleColumns,
    renderedColumns,
    containerWidth,
    firstColumnToRender,
    lastColumnToRender,
    cellFocus,
    cellTabIndex,
    editRowsState,
    isLastVisible = false,
    onClick,
    onDoubleClick,
    onMouseEnter,
    onMouseLeave,
    ...other
  } = props;
  const ariaRowIndex = index + 2; // 1 for the header row and 1 as it's 1-based
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const currentPage = useGridVisibleRows(apiRef, rootProps);
  const columnsTotalWidth = useGridSelector(apiRef, gridColumnsTotalWidthSelector);
  const { hasScrollX, hasScrollY } = apiRef.current.getRootDimensions() ?? {
    hasScrollX: false,
    hasScrollY: false,
  };

  const ownerState = {
    selected,
    isLastVisible,
    classes: rootProps.classes,
    editing: apiRef.current.getRowMode(rowId) === GridRowModes.Edit,
    editable: rootProps.editMode === GridEditModes.Row,
  };

  const classes = useUtilityClasses(ownerState);

  const publish = React.useCallback(
    (
        eventName: keyof GridRowEventLookup,
        propHandler: React.MouseEventHandler<HTMLDivElement> | undefined,
      ): React.MouseEventHandler<HTMLDivElement> =>
      (event) => {
        // Ignore portal
        // The target is not an element when triggered by a Select inside the cell
        // See https://github.com/mui/material-ui/issues/10534
        if (
          (event.target as any).nodeType === 1 &&
          !event.currentTarget.contains(event.target as Element)
        ) {
          return;
        }

        // The row might have been deleted
        if (!apiRef.current.getRow(rowId)) {
          return;
        }

        apiRef.current.publishEvent(eventName, apiRef.current.getRowParams(rowId), event);

        if (propHandler) {
          propHandler(event);
        }
      },
    [apiRef, rowId],
  );

  const publishClick = React.useCallback(
    (event) => {
      const cell = findParentElementFromClassName(event.target, gridClasses.cell);
      const field = cell?.getAttribute('data-field');

      // Check if the field is available because the cell that fills the empty
      // space of the row has no field.
      if (field) {
        // User clicked in the checkbox added by checkboxSelection
        if (field === GRID_CHECKBOX_SELECTION_COL_DEF.field) {
          return;
        }

        // User opened a detail panel
        if (field === '__detail_panel_toggle__') {
          return;
        }

        // User is editing a cell
        if (apiRef.current.getCellMode(rowId, field) === GridCellModes.Edit) {
          return;
        }

        // User clicked a button from the "actions" column type
        const column = apiRef.current.getColumn(field);
        if (column.type === GRID_ACTIONS_COLUMN_TYPE) {
          return;
        }
      }

      publish(GridEvents.rowClick, onClick)(event);
    },
    [apiRef, onClick, publish, rowId],
  );

  const style = {
    ...styleProp,
    maxHeight: rowHeight,
    minHeight: rowHeight,
  };

  const sizes = apiRef.current.unstable_getRowInternalSizes(rowId);

  if (sizes?.spacingTop) {
    const property = rootProps.rowSpacingType === 'border' ? 'borderTopWidth' : 'marginTop';
    style[property] = sizes.spacingTop;
  }

  if (sizes?.spacingBottom) {
    const property = rootProps.rowSpacingType === 'border' ? 'borderBottomWidth' : 'marginBottom';
    style[property] = sizes.spacingBottom;
  }

  let rowClassName: string | null = null;

  if (typeof rootProps.getRowClassName === 'function') {
    const indexRelativeToCurrentPage = index - currentPage.range!.firstRowIndex;
    const rowParams: GridRowClassNameParams = {
      ...apiRef.current.getRowParams(rowId),
      isFirstVisible: indexRelativeToCurrentPage === 0,
      isLastVisible: indexRelativeToCurrentPage === currentPage.rows.length - 1,
    };

    rowClassName = rootProps.getRowClassName(rowParams);
  }

  const cells: JSX.Element[] = [];

  for (let i = 0; i < renderedColumns.length; i += 1) {
    const column = renderedColumns[i];
    const indexRelativeToAllColumns = firstColumnToRender + i;

    const isLastColumn = indexRelativeToAllColumns === visibleColumns.length - 1;
    const removeLastBorderRight = isLastColumn && hasScrollX && !hasScrollY;
    const showRightBorder = !isLastColumn
      ? rootProps.showCellRightBorder
      : !removeLastBorderRight && rootProps.disableExtendRowFullWidth;

    const cellParams = apiRef.current.getCellParams(rowId, column.field);

    const classNames: string[] = [];

    if (column.cellClassName) {
      classNames.push(
        clsx(
          typeof column.cellClassName === 'function'
            ? column.cellClassName(cellParams)
            : column.cellClassName,
        ),
      );
    }

    const editCellState = editRowsState[rowId] ? editRowsState[rowId][column.field] : null;
    let content: React.ReactNode = null;

    if (editCellState == null && column.renderCell) {
      content = column.renderCell({ ...cellParams, api: apiRef.current });
      // TODO move to GridCell
      classNames.push(
        clsx(gridClasses['cell--withRenderer'], rootProps.classes?.['cell--withRenderer']),
      );
    }

    if (editCellState != null && column.renderEditCell) {
      const params = { ...cellParams, ...editCellState, api: apiRef.current };
      content = column.renderEditCell(params);
      // TODO move to GridCell
      classNames.push(clsx(gridClasses['cell--editing'], rootProps.classes?.['cell--editing']));
    }

    if (rootProps.getCellClassName) {
      // TODO move to GridCell
      classNames.push(rootProps.getCellClassName(cellParams));
    }

    const hasFocus =
      cellFocus !== null && cellFocus.id === rowId && cellFocus.field === column.field;

    const tabIndex =
      cellTabIndex !== null &&
      cellTabIndex.id === rowId &&
      cellTabIndex.field === column.field &&
      cellParams.cellMode === 'view'
        ? 0
        : -1;

    cells.push(
      <rootProps.components.Cell
        key={column.field}
        value={cellParams.value}
        field={column.field}
        width={column.computedWidth}
        rowId={rowId}
        height={rowHeight}
        showRightBorder={showRightBorder}
        formattedValue={cellParams.formattedValue}
        align={column.align || 'left'}
        cellMode={cellParams.cellMode}
        colIndex={indexRelativeToAllColumns}
        isEditable={cellParams.isEditable}
        hasFocus={hasFocus}
        tabIndex={tabIndex}
        className={clsx(classNames)}
        {...rootProps.componentsProps?.cell}
      >
        {content}
      </rootProps.components.Cell>,
    );
  }

  const emptyCellWidth = containerWidth - columnsTotalWidth;

  return (
    <div
      data-id={rowId}
      data-rowindex={index}
      role="row"
      className={clsx(rowClassName, classes.root, className)}
      aria-rowindex={ariaRowIndex}
      aria-selected={selected}
      style={style}
      onClick={publishClick}
      onDoubleClick={publish(GridEvents.rowDoubleClick, onDoubleClick)}
      onMouseEnter={publish(GridEvents.rowMouseEnter, onMouseEnter)}
      onMouseLeave={publish(GridEvents.rowMouseLeave, onMouseLeave)}
      {...other}
    >
      {cells}
      {emptyCellWidth > 0 && <EmptyCell width={emptyCellWidth} height={rowHeight} />}
    </div>
  );
}

GridRow.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  cellFocus: PropTypes.object,
  cellTabIndex: PropTypes.object,
  containerWidth: PropTypes.number.isRequired,
  editRowsState: PropTypes.object.isRequired,
  firstColumnToRender: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isLastVisible: PropTypes.bool,
  lastColumnToRender: PropTypes.number.isRequired,
  renderedColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
  row: PropTypes.object.isRequired,
  rowHeight: PropTypes.number.isRequired,
  rowId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  selected: PropTypes.bool.isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
} as any;

export { GridRow };
