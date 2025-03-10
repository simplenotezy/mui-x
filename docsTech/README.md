# Tech Doc

<p align="center">
  <a href="https://mui.com/" rel="noopener" target="_blank"><img width="150" src="https://mui.com/static/logo.svg" alt="MUI logo"></a>
</p>

<h1 align="center">MUI X DataGrid overview</h1>

Welcome in the documentation for contributors. If you want to use DataGrid components for your project, the [documention for developpers](https://mui.com/components/data-grid/getting-started/) is more appropriate.
Here we will discuss how the code is structured, to simplify codebase navigation, and onboard new contributors.

## Where is the code?

In folder `packages` you will find one subfolder per exported package (`@mui/x-data-grid`, `@mui/x-data-grid-pro`, ...)

Since `@mui/x-data-grid-pro` is an extension of `@mui/x-data-grid`, it imports all the common features from `@mui/x-data-grid` and the internal logic are imported from `@mui/x-data-grid/internals` which is defined in `x-data-grid/src/internals/index.ts`.

In each package, the most used folders are:

- `components` which contains all the React components. These files are responsible for displaying the grid and listening for user interactions.
- `hooks` which contains all the logic of the DataGrid.
  - `hooks/core` defines logics for developers: initialization of the grid, error handling, translations, ...
  - `hooks/utils` defines logics for contributors: manipulating the state, managing events, ...
  - `hooks/features` defines logics for end-users: selection, filtering, editing, ...
- `DataGrid[Pro]/useDataGrid[Pro]Component.tsx` is the file in which all the hooks are added to the grid
- `colDef` contains the default values for each [column type](https://mui.com/components/data-grid/columns/#column-types): rendering cell, filter operators, sorting method, ...
- `models` define the typescript interfaces of the gird

## How does it work?

![Workflow Scheme](./img/overviewSchemDark.svg#gh-dark-mode-only)
![Workflow Scheme](./img/overviewSchemLight.svg#gh-light-mode-only)

### Accessing state

The react components can [access the state](https://mui.com/components/data-grid/state/#access-the-state) with either selectors or getter methods.
Here is an example.

```js
const apiRef = useGridApiContext();
// or
const filterModel = useGridSelector(apiRef, gridFilterModelSelector);
const row = apiRef.current.getRow(id);
```

### Updating state

To update the state, the component can either call a setter or publish an event. Here are examples with updating cell editing by setter, and handling cell key down by dispatching `GridEvents.cellKeyDown` event.

```js
apiRef.current.setEditCellValue(newParams, event);
// or
apiRef.current.publishEvent(GridEvents.cellKeyDown, params, event as any);
```

An event can be consumed by multiple listeners.
For example, `GridEvents.cellKeyDown` is listened by the focus, edit, selection, and navigation feature hooks.
Each of them defines an event handler responsible for modifying their sub-state.

```js
useGridApiEventHandler(apiRef, GridEvents.cellKeyDown, handleCellKeyDown);
```

The other interest of events is that developers can listen to them by [subscribing to the event](https://mui.com/components/data-grid/events/#subscribing-to-events) or by providing a `on<Event>` prop such as `onEditCellPropsChange`.
Notice that all the events do not have an associated prop `on<Event>`

## Specific features

Here you will find more precision about how some features are designed.

- [filtering](./filtering)
- [virtualization](./virtualization)
- print (TODO)
