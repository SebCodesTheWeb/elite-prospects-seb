'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Image,
  Text,
  Link,
  Skeleton,
} from '@chakra-ui/react'
import { useStandingsTable } from './use-standings-table'

export const StandingsTable = () => {
  const { table, expandedRows, toggleRowExpanded } = useStandingsTable()

  return (
    <Skeleton isLoaded={true}>
      <TableContainer
        borderWidth='1px'
        borderStyle='solid'
        borderColor='gray.600'
        borderRadius='4px'
        bgColor='white'
        maxH='1000px'
        overflowY='auto'
      >
        <Table variant='striped' colorScheme='linkedin'>
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
              <>
                <Tr
                  key={row.id}
                  onClick={() => toggleRowExpanded(row.id)}
                  cursor='pointer'
                  _hover={{ opacity: 0.5 }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
                <AnimatePresence initial={false}>
                  {expandedRows.includes(row.id) && (
                    <motion.tr
                      key={row.id + '-expanded'}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        opacity: { duration: 0.3 },
                        height: { duration: 0.4 },
                      }}
                    >
                      <Td colSpan={table.getAllColumns().length}>
                        <Box display='flex' justifyContent='space-between'>
                          <Image
                            src={row.original.extra.logo}
                            alt={`${row.original.name} logo`}
                            boxSize='50px'
                          />
                          <Box>
                            <Text>
                              <b>Founded:</b> {row.original.extra.founded}
                            </Text>
                            <Text>
                              <b>Arena:</b> {row.original.extra.arena.name}
                            </Text>
                            <Text>
                              <b>Location:</b>{' '}
                              {row.original.extra.arena.location}
                            </Text>
                            <Text>
                              <b>Capacity:</b>{' '}
                              {row.original.extra.arena.capacity}
                            </Text>
                            <Text>
                              <b>Year of Construction:</b>{' '}
                              {row.original.extra.arena.yearOfConstruction}
                            </Text>
                          </Box>
                          <Box>
                            <Text>
                              <b>Colors:</b> {row.original.extra.colors}
                            </Text>
                            <Link
                              href={row.original.extra.links.officialWebUrl}
                              isExternal
                            >
                              Official Website
                            </Link>
                          </Box>
                        </Box>
                      </Td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Skeleton>
  )
}
