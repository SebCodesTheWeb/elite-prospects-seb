'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { flexRender } from '@tanstack/react-table'
import {
  Table,
  SkeletonText,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Skeleton,
  Heading,
} from '@chakra-ui/react'
import { useStandingsTable } from './use-standings-table'
import { TeamCard } from './team-card'

export const StandingsTable = () => {
  const { table, expandedRows, toggleRowExpanded, isLoading } =
    useStandingsTable()

  return (
    <Skeleton isLoaded={!isLoading}>
      <TableContainer
        borderWidth='2px'
        borderStyle='solid'
        borderColor='gray.200'
        borderRadius='md'
        bgColor='white'
        w='100%'
        overflowY='auto'
        overflowX='auto'
        maxH='1000px'
      >
        <Box w='100%' p='4'>
          <Heading size='lg' color='gray.600'>
            NHL standings 2022-2023
          </Heading>
        </Box>
        <Table
          variant='striped'
          colorScheme='linkedin'
          size='sm'
          borderTop='2px'
          borderTopColor='gray.200'
          borderTopStyle='solid'
        >
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
              <React.Fragment key={row.id}>
                <Tr
                  onClick={() => toggleRowExpanded(row.original.id)}
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
                  {expandedRows
                    .filter((teamData) => teamData.id === row.original.id)
                    .map((teamData) => (
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
                          {teamData.isLoading && (
                            <Box p='4' boxShadow='md' bg='white' h='150px'>
                              <SkeletonText
                                mt='4'
                                noOfLines={4}
                                spacing='4'
                                skeletonHeight='2'
                              />
                            </Box>
                          )}
                          {!teamData.isLoading && (
                            <TeamCard teamData={teamData} />
                          )}
                        </Td>
                      </motion.tr>
                    ))}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Skeleton>
  )
}
