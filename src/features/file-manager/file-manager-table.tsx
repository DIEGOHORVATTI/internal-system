import type { IFile } from '@/types/file'
import type { BoxProps } from '@mui/material/Box'
import type { UseTableReturn, TableHeadCellProps } from '@/components/table'

import Iconify from '@/components/iconify'
import * as Table from '@/components/table'

import Box from '@mui/material/Box'
import TableMui from '@mui/material/Table'
import Tooltip from '@mui/material/Tooltip'
import TableBody from '@mui/material/TableBody'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import { tableCellClasses } from '@mui/material/TableCell'
import { tablePaginationClasses } from '@mui/material/TablePagination'

import { FileManagerTableRow } from './file-manager-table-row'

const TABLE_HEAD: TableHeadCellProps[] = [
  { id: 'name', label: 'Name' },
  { id: 'size', label: 'Size', width: 120 },
  { id: 'type', label: 'Type', width: 120 },
  { id: 'modifiedAt', label: 'Modified', width: 140 },
  { id: 'shared', label: 'Shared', align: 'right', width: 140 },
  { id: '', width: 88 },
]

type Props = BoxProps & {
  table: UseTableReturn
  notFound: boolean
  dataFiltered: IFile[]
  onOpenConfirm: () => void
  onDeleteRow: (id: string) => void
}

export function FileManagerTable({
  sx,
  table,
  notFound,
  onDeleteRow,
  dataFiltered,
  onOpenConfirm,
  ...other
}: Props) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    /********/
    selected,
    onSelectRow,
    onSelectAllRows,
    /********/
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = table

  return (
    <>
      <Box
        sx={[
          (theme) => ({ position: 'relative', m: { md: theme.spacing(-2, -3, 0, -3) } }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Table.TableSelectedAction
          dense={dense}
          numSelected={selected.length}
          rowCount={dataFiltered.length}
          onSelectAllRows={(checked) =>
            onSelectAllRows(
              checked,
              dataFiltered.map((row) => row.id)
            )
          }
          action={
            <>
              <Tooltip title="Share">
                <IconButton color="primary">
                  <Iconify icon="solar:share-bold" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton color="primary" onClick={onOpenConfirm}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            </>
          }
          sx={{
            pl: 1,
            pr: 2,
            top: 16,
            left: 24,
            right: 24,
            width: 'auto',
            borderRadius: 1.5,
          }}
        />

        <TableContainer sx={{ px: { md: 3 } }}>
          <TableMui
            size={dense ? 'small' : 'medium'}
            sx={{ minWidth: 960, borderCollapse: 'separate', borderSpacing: '0 16px' }}
          >
            <Table.TableHeadCustom
              order={order}
              orderBy={orderBy}
              headCells={TABLE_HEAD}
              rowCount={dataFiltered.length}
              numSelected={selected.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              sx={{
                [`& .${tableCellClasses.head}`]: {
                  '&:first-of-type': { borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
                  '&:last-of-type': { borderTopRightRadius: 12, borderBottomRightRadius: 12 },
                },
              }}
            />

            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <FileManagerTableRow
                    key={row.id}
                    row={row}
                    selected={selected.includes(row.id)}
                    onSelectRow={() => onSelectRow(row.id)}
                    onDeleteRow={() => onDeleteRow(row.id)}
                  />
                ))}

              <Table.TableNoData
                notFound={notFound}
                sx={[
                  (theme) => ({
                    m: -2,
                    borderRadius: 1.5,
                    border: `dashed 1px ${theme.palette.divider}`,
                  }),
                ]}
              />
            </TableBody>
          </TableMui>
        </TableContainer>
      </Box>

      <Table.TablePaginationCustom
        page={page}
        dense={dense}
        rowsPerPage={rowsPerPage}
        count={dataFiltered.length}
        onPageChange={onChangePage}
        onChangeDense={onChangeDense}
        onRowsPerPageChange={onChangeRowsPerPage}
        sx={{ [`& .${tablePaginationClasses.toolbar}`]: { borderTopColor: 'transparent' } }}
      />
    </>
  )
}
