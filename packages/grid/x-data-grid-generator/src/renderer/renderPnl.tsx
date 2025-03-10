import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';

const Value = styled('div')(({ theme }) => ({
  width: '100%',
  fontVariantNumeric: 'tabular-nums',
  '&.positive': {
    color:
      theme.palette.mode === 'light' ? theme.palette.success.dark : theme.palette.success.light,
  },
  '&.negative': {
    color: theme.palette.mode === 'light' ? theme.palette.error.dark : theme.palette.error.light,
  },
}));

function pnlFormatter(value: number) {
  return value < 0 ? `(${Math.abs(value).toLocaleString()})` : value.toLocaleString();
}

interface PnlProps {
  value: number;
}

const Pnl = React.memo(function Pnl(props: PnlProps) {
  const { value } = props;

  return (
    <Value
      className={clsx({
        positive: value > 0,
        negative: value < 0,
      })}
    >
      {pnlFormatter(value)}
    </Value>
  );
});

export function renderPnl(params: GridRenderCellParams) {
  if (params.rowNode.isAutoGenerated) {
    return '';
  }

  return <Pnl value={params.value as any} />;
}
