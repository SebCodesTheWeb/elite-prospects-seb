import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  createColumnHelper,
} from '@tanstack/react-table'
import { Team as TeamModel } from '../../types/leagues-model'
import { useQuery } from '@tanstack/react-query'

type Team = TeamModel & {
  '+/-'?: number
  TP?: number
  PGP?: number
}
const columnHelper = createColumnHelper<Team>()

const columns = [
  columnHelper.accessor('name', {
    header: () => 'Team',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('division', {
    header: () => 'Division',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('GP', {
    header: () => 'GP',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('W', {
    header: 'W',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('L', {
    header: 'L',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('OTW', {
    header: 'OTW',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('OTL', {
    header: 'OTL',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('GF', {
    header: 'GF',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('GA', {
    header: 'GA',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('postSeason', {
    header: 'Post Season',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('+/-', {
    header: '+/-',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('TP', {
    header: 'TP',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('PGP', {
    header: 'P/GP',
    cell: (info) => info.renderValue(),
  }),
]

const fetchStandings = async (): Promise<Team[]> => {
  const response = await fetch('/api/nhl')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()

  const dataWithExtraDerivedColumns = data.map((team: Team) => ({
    ...team,
    '+/-': team.GF - team.GA,
    TP: team.W * 2 + team.OTL,
    PGP: ((team.W * 2 + team.OTL) / team.GP).toFixed(2),
  }))

  return dataWithExtraDerivedColumns
}

export const useStandingsTable = () => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'division',
      desc: false,
    },
  ])
  const [expandedRows, setExpandedRows] = useState<string[]>([])

  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ['standings'],
    queryFn: fetchStandings,
  })

  if (error) {
    throw new Error(`Err: ${error}`)
  }

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

  const toggleRowExpanded = (rowId: string) => {
    setExpandedRows((currentRows) => {
      if (currentRows.includes(rowId)) {
        return currentRows.filter((id) => id !== rowId)
      } else {
        return [...currentRows, rowId]
      }
    })
  }

  return {
    table,
    expandedRows,
    toggleRowExpanded,
    isLoading,
  }
}