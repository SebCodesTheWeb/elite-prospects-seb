'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { flexRender } from '@tanstack/react-table'
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
  const { table, expandedRows, toggleRowExpanded, isLoading } =
    useStandingsTable()

  return (
    <Skeleton isLoaded={!isLoading}>
      <TableContainer
        borderWidth='2px'
        borderStyle='solid'
        borderColor='gray.200'
        borderRadius='4px'
        bgColor='white'
        maxH='1000px'
        overflowY='auto'
      >
        <Table variant='striped' colorScheme='linkedin' size="sm">
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
                            src={row.original.logo}
                            alt={`${row.original.name} logo`}
                            boxSize='50px'
                          />
                          <Box>
                            <Text>
                              <b>Founded:</b> {row.original.founded}
                            </Text>
                            <Text>
                              <b>Arena:</b> {row.original.arena}
                            </Text>
                            <Text>
                              <b>Country:</b> {row.original.country}
                            </Text>
                            <Text>
                              <b>City:</b> {row.original.city}
                            </Text>
                          </Box>
                          <Box>
                            <Text>
                              <b>Colors:</b> {row.original.colors}
                            </Text>
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
