import { GridRowModel, GridRowId, GridRowModelUpdate, GridRowTreeNodeConfig } from '../gridRows';

/**
 * The Row API interface that is available in the grid `apiRef`.
 */
export interface GridRowApi {
  /**
   * Gets the full set of rows as [[Map<GridRowId, GridRowModel>]].
   * @returns {Map<GridRowId, GridRowModel>} The full set of rows.
   */
  getRowModels: () => Map<GridRowId, GridRowModel>;
  /**
   * Gets the total number of rows in the grid.
   * @returns {number} The number of rows.
   */
  getRowsCount: () => number;
  /**
   * Gets the list of row ids.
   * @returns {GridRowId[]} A list of ids.
   */
  getAllRowIds: () => GridRowId[];
  /**
   * Sets a new set of rows.
   * @param {GridRowModel[]} rows The new rows.
   */
  setRows: (rows: GridRowModel[]) => void;
  /**
   * Allows to updates, insert and delete rows in a single call.
   * @param {GridRowModelUpdate[]} updates An array of rows with an `action` specifying what to do.
   */
  updateRows: (updates: GridRowModelUpdate[]) => void;
  /**
   * Gets the row data with a given id.
   * @param {GridRowId} id The id of the row.
   * @returns {GridRowModel} The row data.
   */
  getRow: (id: GridRowId) => GridRowModel | null;
  /**
   * Gets the row node from the internal tree structure.
   * @param {GridRowId} id The id of the row.
   * @returns {GridRowTreeNodeConfig} The row data.
   */
  getRowNode: (id: GridRowId) => GridRowTreeNodeConfig | null;
  /**
   * Expand or collapse a row children.
   * @param {GridRowId} id the ID of the row to expand or collapse.
   * @param {boolean} isExpanded A boolean indicating if the row must be expanded or collapsed.
   */
  setRowChildrenExpansion: (id: GridRowId, isExpanded: boolean) => void;
  /**
   * Gets the index of a row relative to the rows that are reachable by scroll.
   * @param {GridRowId} id The row id.
   * @returns {number} The index of the row.
   */
  getRowIndexRelativeToVisibleRows: (id: GridRowId) => number;
}
