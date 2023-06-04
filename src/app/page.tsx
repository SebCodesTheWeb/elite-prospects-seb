'use client'
import { useState, useEffect } from 'react'
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table'
import {
  Table,
  Stack,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Heading,
} from '@chakra-ui/react'

type Team = {
  name: string
  GP: number
  W: number
  L: number
  OTW: number
  OTL: number
  GF: number
  GA: number
  postSeason: string
  division: string
  TP?: number
  PGP?: number
  '+/-': number
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

export default function Home() {
  const [data, setData] = useState<Team[]>(() => [])
  const [sorting, setSorting] = useState<SortingState>([])

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

  return (
    <main>
      <Center w='100%' h='100vh' p='4'>
        <Stack>
          <Heading>NHL Conferences</Heading>
          <TableContainer
            borderWidth='1px'
            borderStyle='solid'
            borderColor='gray.600'
            borderRadius='4px'
          >
            <Table variant='striped' colorScheme='gray'>
              <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        cursor='pointer'
                        userSelect='none'
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {{
                          asc: ' ▲',
                          desc: '▼',
                        }[header.column.getIsSorted() as string] ?? null}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.map((row) => (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </Center>
    </main>
  )
}
