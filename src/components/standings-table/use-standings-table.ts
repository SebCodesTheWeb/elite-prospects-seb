import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  createColumnHelper,
} from '@tanstack/react-table'
import { Team } from '../../../types/standings.model'
import { DerivedTeamData, PlaceholderTeamData } from '../../../types/team.model'
import { useStandings } from '../utils/use-standings'
import axios from 'axios'

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

const fetchExtraTeamData = async (teamId: number): Promise<DerivedTeamData> => {
  const response = await axios.get(`/api/team?teamId=${teamId}`)

  return response.data
}

export const useStandingsTable = () => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'division',
      desc: false,
    },
  ])
  const [expandedRows, setExpandedRows] = useState<
    (DerivedTeamData | PlaceholderTeamData)[]
  >([])

  const { isLoading, data } = useStandings()

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

  const toggleRowExpanded = async (teamId: number): Promise<void> => {
    const teamExists = expandedRows.some((teamData) => teamData.id === teamId)
    if (teamExists) {
      setExpandedRows((prevExpandedRows) =>
        prevExpandedRows.filter((teamData) => teamData.id !== teamId)
      )
    } else {
      setExpandedRows((prevExpandedRows) => [
        ...prevExpandedRows,
        { id: teamId, isLoading: true },
      ])

      const newTeamData = await fetchExtraTeamData(teamId)

      setExpandedRows((prevExpandedRows) =>
        prevExpandedRows.map((teamData) =>
          teamData.id === teamId
            ? { ...newTeamData, isLoading: false }
            : teamData
        )
      )
    }
  }

  return {
    table,
    expandedRows,
    toggleRowExpanded,
    isLoading,
  }
}
