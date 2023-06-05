import { useState, useEffect } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  createColumnHelper,
} from '@tanstack/react-table'
import { Team as TeamModel } from '../../pages/api/leagues'

type Team = TeamModel & {
  '+/-'?: number
  TP?: number
  PGP?: number
}
const columnHelper = createColumnHelper<Team>()

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: () => <span>Team</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('division', {
    header: () => 'Division',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('GP', {
    header: () => 'GP',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('W', {
    header: 'W',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('L', {
    header: 'L',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('OTW', {
    header: 'OTW',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('OTL', {
    header: 'OTL',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('GF', {
    header: 'GF',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('GA', {
    header: 'GA',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('postSeason', {
    header: 'Post Season',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('+/-', {
    header: '+/-',
    cell: (info) =>
      info.row.getValue<number>('GF') - info.row.getValue<number>('GA'),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('TP', {
    header: 'TP',
    cell: (info) =>
      info.row.getValue<number>('W') * 2 + info.row.getValue<number>('OTL'),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('PGP', {
    header: 'P/GP',
    cell: (info) =>
      (
        (info.row.getValue<number>('W') * 2 +
          info.row.getValue<number>('OTL')) /
        info.row.getValue<number>('GP')
      ).toFixed(2),
    footer: (info) => info.column.id,
  }),
]

export const useStandingsTable = () => {
  const [data, setData] = useState<Team[]>(() => [])
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'division',
      desc: false,
    },
  ])
  const [expandedRows, setExpandedRows] = useState<string[]>([])

  const toggleRowExpanded = (rowId: string) => {
    setExpandedRows((currentRows) => {
      if (currentRows.includes(rowId)) {
        return currentRows.filter((id) => id !== rowId)
      } else {
        return [...currentRows, rowId]
      }
    })
  }

  useEffect(() => {
    const fetchTeamData = async () => {
      const response = await fetch('/api/nhl')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setData(data)
    }

    fetchTeamData().catch((e) => console.error('There was an error!', e))
  }, [])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  })

  return {
    table,
    expandedRows,
    toggleRowExpanded,
  }
}
