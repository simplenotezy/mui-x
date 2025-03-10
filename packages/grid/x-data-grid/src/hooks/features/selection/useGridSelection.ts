import * as React from 'react';
import { GridEvents, GridEventListener } from '../../../models/events';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridApiCommunity } from '../../../models/api/gridApiCommunity';
import { GridSelectionApi } from '../../../models/api/gridSelectionApi';
import { GridRowId } from '../../../models/gridRows';
import { useGridApiEventHandler } from '../../utils/useGridApiEventHandler';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { useGridLogger } from '../../utils/useGridLogger';
import { gridRowsLookupSelector } from '../rows/gridRowsSelector';
import { isGridCellRoot } from '../../../utils/domUtils';
import {
  gridSelectionStateSelector,
  selectedGridRowsSelector,
  selectedIdsLookupSelector,
} from './gridSelectionSelector';
import { gridPaginatedVisibleSortedGridRowIdsSelector } from '../pagination';
import { gridVisibleSortedRowIdsSelector } from '../filter/gridFilterSelector';
import { GRID_CHECKBOX_SELECTION_COL_DEF, GRID_ACTIONS_COLUMN_TYPE } from '../../../colDef';
import { GridCellModes } from '../../../models/gridEditRowModel';
import { isKeyboardEvent } from '../../../utils/keyboardUtils';
import { getVisibleRows } from '../../utils/useGridVisibleRows';
import { GridStateInitializer } from '../../utils/useGridInitializeState';
import { GridSelectionModel } from '../../../models';

const getSelectionModelPropValue = (
  selectionModelProp: DataGridProcessedProps['selectionModel'],
  prevSelectionModel?: GridSelectionModel,
) => {
  if (selectionModelProp == null) {
    return selectionModelProp;
  }

  if (Array.isArray(selectionModelProp)) {
    return selectionModelProp;
  }

  if (prevSelectionModel && prevSelectionModel[0] === selectionModelProp) {
    return prevSelectionModel;
  }

  return [selectionModelProp];
};

export const selectionStateInitializer: GridStateInitializer<
  Pick<DataGridProcessedProps, 'selectionModel'>
> = (state, props) => ({
  ...state,
  selection: getSelectionModelPropValue(props.selectionModel) ?? [],
});

/**
 * @requires useGridRows (state, method)
 * @requires useGridParamsApi (method)
 */
export const useGridSelection = (
  apiRef: React.MutableRefObject<GridApiCommunity>,
  props: Pick<
    DataGridProcessedProps,
    | 'checkboxSelection'
    | 'selectionModel'
    | 'onSelectionModelChange'
    | 'disableMultipleSelection'
    | 'disableSelectionOnClick'
    | 'isRowSelectable'
    | 'checkboxSelectionVisibleOnly'
    | 'pagination'
    | 'paginationMode'
    | 'classes'
  >,
): void => {
  const logger = useGridLogger(apiRef, 'useGridSelection');

  const propSelectionModel = React.useMemo(() => {
    return getSelectionModelPropValue(
      props.selectionModel,
      gridSelectionStateSelector(apiRef.current.state),
    );
  }, [apiRef, props.selectionModel]);

  const lastRowToggled = React.useRef<GridRowId | null>(null);

  apiRef.current.unstable_updateControlState({
    stateId: 'selection',
    propModel: propSelectionModel,
    propOnChange: props.onSelectionModelChange,
    stateSelector: gridSelectionStateSelector,
    changeEvent: GridEvents.selectionChange,
  });

  const {
    checkboxSelection,
    disableMultipleSelection,
    disableSelectionOnClick,
    isRowSelectable,
    pagination,
    paginationMode,
  } = props;

  const canHaveMultipleSelection = !disableMultipleSelection || checkboxSelection;

  const expandRowRangeSelection = React.useCallback(
    (id: GridRowId) => {
      let endId = id;
      const startId = lastRowToggled.current ?? id;
      const isSelected = apiRef.current.isRowSelected(id);
      if (isSelected) {
        const visibleRowIds = gridVisibleSortedRowIdsSelector(apiRef);
        const startIndex = visibleRowIds.findIndex((rowId) => rowId === startId);
        const endIndex = visibleRowIds.findIndex((rowId) => rowId === endId);
        if (startIndex === endIndex) {
          return;
        }
        if (startIndex > endIndex) {
          endId = visibleRowIds[endIndex + 1];
        } else {
          endId = visibleRowIds[endIndex - 1];
        }
      }

      lastRowToggled.current = id;

      apiRef.current.selectRowRange({ startId, endId }, !isSelected);
    },
    [apiRef],
  );

  /**
   * API METHODS
   */
  const setSelectionModel = React.useCallback<GridSelectionApi['setSelectionModel']>(
    (model) => {
      const currentModel = gridSelectionStateSelector(apiRef.current.state);
      if (currentModel !== model) {
        logger.debug(`Setting selection model`);
        apiRef.current.setState((state) => ({ ...state, selection: model }));
        apiRef.current.forceUpdate();
      }
    },
    [apiRef, logger],
  );

  const isRowSelected = React.useCallback<GridSelectionApi['isRowSelected']>(
    (id) => gridSelectionStateSelector(apiRef.current.state).includes(id),
    [apiRef],
  );

  const getSelectedRows = React.useCallback<GridSelectionApi['getSelectedRows']>(
    () => selectedGridRowsSelector(apiRef),
    [apiRef],
  );

  const selectRow = React.useCallback<GridSelectionApi['selectRow']>(
    (id, isSelected = true, resetSelection = false) => {
      if (isRowSelectable && !isRowSelectable(apiRef.current.getRowParams(id))) {
        return;
      }

      lastRowToggled.current = id;

      if (resetSelection) {
        logger.debug(`Setting selection for row ${id}`);

        apiRef.current.setSelectionModel(isSelected ? [id] : []);
      } else {
        logger.debug(`Toggling selection for row ${id}`);

        const selection = gridSelectionStateSelector(apiRef.current.state);
        const newSelection: GridRowId[] = selection.filter((el) => el !== id);

        if (isSelected) {
          newSelection.push(id);
        }

        const isSelectionValid = newSelection.length < 2 || canHaveMultipleSelection;
        if (isSelectionValid) {
          apiRef.current.setSelectionModel(newSelection);
        }
      }
    },
    [apiRef, isRowSelectable, logger, canHaveMultipleSelection],
  );

  const selectRows = React.useCallback<GridSelectionApi['selectRows']>(
    (ids: GridRowId[], isSelected = true, resetSelection = false) => {
      logger.debug(`Setting selection for several rows`);

      const selectableIds = isRowSelectable
        ? ids.filter((id) => isRowSelectable(apiRef.current.getRowParams(id)))
        : ids;

      let newSelection: GridRowId[];
      if (resetSelection) {
        newSelection = isSelected ? selectableIds : [];
      } else {
        // We clone the existing object to avoid mutating the same object returned by the selector to others part of the project
        const selectionLookup = {
          ...selectedIdsLookupSelector(apiRef),
        };

        selectableIds.forEach((id) => {
          if (isSelected) {
            selectionLookup[id] = id;
          } else {
            delete selectionLookup[id];
          }
        });

        newSelection = Object.values(selectionLookup);
      }

      const isSelectionValid = newSelection.length < 2 || canHaveMultipleSelection;
      if (isSelectionValid) {
        apiRef.current.setSelectionModel(newSelection);
      }
    },
    [apiRef, isRowSelectable, logger, canHaveMultipleSelection],
  );

  const selectRowRange = React.useCallback<GridSelectionApi['selectRowRange']>(
    (
      {
        startId,
        endId,
      }: {
        startId: GridRowId;
        endId: GridRowId;
      },
      isSelected = true,
      resetSelection,
    ) => {
      if (!apiRef.current.getRow(startId) || !apiRef.current.getRow(endId)) {
        return;
      }

      logger.debug(`Expanding selection from row ${startId} to row ${endId}`);

      const visibleRowIds = gridVisibleSortedRowIdsSelector(apiRef);
      const startIndex = visibleRowIds.indexOf(startId);
      const endIndex = visibleRowIds.indexOf(endId);
      const [start, end] = startIndex > endIndex ? [endIndex, startIndex] : [startIndex, endIndex];
      const rowsBetweenStartAndEnd = visibleRowIds.slice(start, end + 1);

      apiRef.current.selectRows(rowsBetweenStartAndEnd, isSelected, resetSelection);
    },
    [apiRef, logger],
  );

  const selectionApi: GridSelectionApi = {
    selectRow,
    selectRows,
    selectRowRange,
    setSelectionModel,
    getSelectedRows,
    isRowSelected,
  };

  useGridApiMethod(apiRef, selectionApi, 'GridSelectionApi');

  /**
   * EVENTS
   */
  const removeOutdatedSelection = React.useCallback(() => {
    const currentSelection = gridSelectionStateSelector(apiRef.current.state);
    const rowsLookup = gridRowsLookupSelector(apiRef);

    // We clone the existing object to avoid mutating the same object returned by the selector to others part of the project
    const selectionLookup = { ...selectedIdsLookupSelector(apiRef) };

    let hasChanged = false;
    currentSelection.forEach((id: GridRowId) => {
      if (!rowsLookup[id]) {
        delete selectionLookup[id];
        hasChanged = true;
      }
    });

    if (hasChanged) {
      apiRef.current.setSelectionModel(Object.values(selectionLookup));
    }
  }, [apiRef]);

  const handleSingleRowSelection = React.useCallback(
    (id: GridRowId, event: React.MouseEvent | React.KeyboardEvent) => {
      const hasCtrlKey = event.metaKey || event.ctrlKey;

      // multiple selection is only allowed if:
      // - it is a checkboxSelection
      // - it is a keyboard selection
      // - CTRL is pressed

      const isMultipleSelectionDisabled =
        !checkboxSelection && !hasCtrlKey && !isKeyboardEvent(event);
      const resetSelection = !canHaveMultipleSelection || isMultipleSelectionDisabled;

      const isSelected = apiRef.current.isRowSelected(id);

      if (resetSelection) {
        apiRef.current.selectRow(id, !isMultipleSelectionDisabled ? !isSelected : true, true);
      } else {
        apiRef.current.selectRow(id, !isSelected, false);
      }
    },
    [apiRef, canHaveMultipleSelection, checkboxSelection],
  );

  const handleCellClick = React.useCallback<GridEventListener<GridEvents.cellClick>>(
    (params, event) => {
      if (disableSelectionOnClick) {
        return;
      }

      if (params.field === GRID_CHECKBOX_SELECTION_COL_DEF.field) {
        // click on checkbox should not trigger row selection
        return;
      }

      if (params.field === '__detail_panel_toggle__') {
        // click to open the detail panel should not select the row
        return;
      }

      if (params.field) {
        const column = apiRef.current.getColumn(params.field);

        if (column.type === GRID_ACTIONS_COLUMN_TYPE) {
          return;
        }
      }

      if (event.shiftKey && (canHaveMultipleSelection || checkboxSelection)) {
        expandRowRangeSelection(params.id);
      } else {
        handleSingleRowSelection(params.id, event);
      }
    },
    [
      disableSelectionOnClick,
      canHaveMultipleSelection,
      checkboxSelection,
      apiRef,
      expandRowRangeSelection,
      handleSingleRowSelection,
    ],
  );

  const preventSelectionOnShift = React.useCallback<GridEventListener<GridEvents.cellMouseDown>>(
    (params, event) => {
      if (canHaveMultipleSelection && event.shiftKey) {
        window.getSelection()?.removeAllRanges();
      }
    },
    [canHaveMultipleSelection],
  );

  const handleRowSelectionCheckboxChange = React.useCallback<
    GridEventListener<GridEvents.rowSelectionCheckboxChange>
  >(
    (params, event) => {
      if ((event.nativeEvent as any).shiftKey) {
        expandRowRangeSelection(params.id);
      } else {
        apiRef.current.selectRow(params.id, params.value);
      }
    },
    [apiRef, expandRowRangeSelection],
  );

  const handleHeaderSelectionCheckboxChange = React.useCallback<
    GridEventListener<GridEvents.headerSelectionCheckboxChange>
  >(
    (params) => {
      const shouldLimitSelectionToCurrentPage =
        props.checkboxSelectionVisibleOnly && props.pagination;

      const rowsToBeSelected = shouldLimitSelectionToCurrentPage
        ? gridPaginatedVisibleSortedGridRowIdsSelector(apiRef)
        : gridVisibleSortedRowIdsSelector(apiRef);

      apiRef.current.selectRows(rowsToBeSelected, params.value);
    },
    [apiRef, props.checkboxSelectionVisibleOnly, props.pagination],
  );

  const handleCellKeyDown = React.useCallback<GridEventListener<GridEvents.cellKeyDown>>(
    (params, event) => {
      // Ignore portal
      // Do not apply shortcuts if the focus is not on the cell root component
      // TODO replace with !event.currentTarget.contains(event.target as Element)
      if (!isGridCellRoot(event.target as Element)) {
        return;
      }

      // Get the most recent params because the cell mode may have changed by another listener
      const cellParams = apiRef.current.getCellParams(params.id, params.field);
      const isEditMode = cellParams.cellMode === GridCellModes.Edit;
      if (isEditMode) {
        return;
      }

      if (event.key === ' ' && event.shiftKey) {
        event.preventDefault();
        handleSingleRowSelection(cellParams.id, event);
        return;
      }

      if (event.key.toLowerCase() === 'a' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        selectRows(apiRef.current.getAllRowIds(), true);
      }
    },
    [apiRef, handleSingleRowSelection, selectRows],
  );

  useGridApiEventHandler(apiRef, GridEvents.visibleRowsSet, removeOutdatedSelection);
  useGridApiEventHandler(apiRef, GridEvents.cellClick, handleCellClick);
  useGridApiEventHandler(
    apiRef,
    GridEvents.rowSelectionCheckboxChange,
    handleRowSelectionCheckboxChange,
  );
  useGridApiEventHandler(
    apiRef,
    GridEvents.headerSelectionCheckboxChange,
    handleHeaderSelectionCheckboxChange,
  );
  useGridApiEventHandler(apiRef, GridEvents.cellMouseDown, preventSelectionOnShift);
  useGridApiEventHandler(apiRef, GridEvents.cellKeyDown, handleCellKeyDown);

  /**
   * EFFECTS
   */
  React.useEffect(() => {
    if (propSelectionModel !== undefined) {
      apiRef.current.setSelectionModel(propSelectionModel);
    }
  }, [apiRef, propSelectionModel]);

  const isStateControlled = propSelectionModel != null;
  React.useEffect(() => {
    if (isStateControlled) {
      return;
    }

    // isRowSelectable changed
    const currentSelection = gridSelectionStateSelector(apiRef.current.state);

    if (isRowSelectable) {
      const newSelection = currentSelection.filter((id) =>
        isRowSelectable(apiRef.current.getRowParams(id)),
      );

      if (newSelection.length < currentSelection.length) {
        apiRef.current.setSelectionModel(newSelection);
      }
    }
  }, [apiRef, isRowSelectable, isStateControlled]);

  React.useEffect(() => {
    const currentSelection = gridSelectionStateSelector(apiRef.current.state);

    if (!canHaveMultipleSelection && currentSelection.length > 1) {
      const { rows: currentPageRows } = getVisibleRows(apiRef, {
        pagination,
        paginationMode,
      });

      const currentPageRowsLookup = currentPageRows.reduce<Record<GridRowId, true>>(
        (acc, { id }) => {
          acc[id] = true;
          return acc;
        },
        {},
      );

      const firstSelectableRow = currentSelection.find((id) => {
        let isSelectable = true;
        if (isRowSelectable) {
          isSelectable = isRowSelectable(apiRef.current.getRowParams(id));
        }
        return isSelectable && currentPageRowsLookup[id]; // Check if the row is in the current page
      });

      apiRef.current.setSelectionModel(
        firstSelectableRow !== undefined ? [firstSelectableRow] : [],
      );
    }
  }, [
    apiRef,
    canHaveMultipleSelection,
    checkboxSelection,
    disableMultipleSelection,
    isRowSelectable,
    pagination,
    paginationMode,
  ]);
};
