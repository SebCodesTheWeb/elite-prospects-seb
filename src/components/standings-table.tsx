'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { flexRender } from '@tanstack/react-table'
import {
  Table,
  Tbody,
  Thead,
  Stack,
  Tr,
  Th,
  Td,
  Wrap,
  Link,
  TableContainer,
  Grid,
  GridItem,
  Flex,
  Box,
  Image,
  Text,
  Heading,
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
        <Table variant='striped' colorScheme='linkedin' size='sm'>
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
                            <Skeleton isLoaded={!teamData.isLoading} h='80px' />
                          )}
                          {!teamData.isLoading && (
                            <Box
                              padding='5'
                              boxShadow='md'
                              borderWidth='1px'
                              borderRadius='lg'
                            >
                              <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                                <GridItem colSpan={1}>
                                  <Image
                                    src={teamData.logo}
                                    alt={`${teamData.name} logo`}
                                    boxSize='100px'
                                  />
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <Flex
                                    direction='column'
                                    justifyContent='space-between'
                                    height='100%'
                                  >
                                    <Text fontSize='xl' fontWeight='bold'>
                                      {teamData.name}
                                    </Text>
                                    <Text>
                                      <b>Founded:</b> {teamData.founded}
                                    </Text>
                                    <Text>
                                      <b>Country:</b> {teamData.country}
                                    </Text>
                                    <Text>
                                      <b>City:</b> {teamData.city}
                                    </Text>
                                    <Text>
                                      <b>Cap Hit:</b> {teamData.capHit}
                                    </Text>
                                    <Text>
                                      <b>Views:</b> {teamData.views}
                                    </Text>
                                  </Flex>
                                </GridItem>

                                <GridItem colSpan={2}>
                                  <Flex
                                    direction='column'
                                    justifyContent='space-between'
                                    height='100%'
                                  >
                                    <Text>
                                      <b>Colors:</b> {teamData.colors}
                                    </Text>
                                    <Text>
                                      <b>Arena:</b> {teamData.arena.name} <br />
                                      <b>Location:</b> {teamData.arena.location}{' '}
                                      <br />
                                      <b>Year of Construction:</b>{' '}
                                      {teamData.arena.yearOfConstruction} <br />
                                      <b>Capacity:</b> {teamData.arena.capacity}
                                    </Text>
                                    <Box>
                                      <Link
                                        isExternal={true}
                                        href={teamData.links.officialWebUrl}
                                      >
                                        Official web page
                                      </Link>
                                      <Link
                                        isExternal={true}
                                        href={teamData.links.eliteprospectsUrl}
                                      >
                                        Elite Prospects
                                      </Link>
                                    </Box>
                                  </Flex>
                                </GridItem>
                              </Grid>
                            </Box>
                          )}
                        </Td>
                      </motion.tr>
                    ))}
                </AnimatePresence>
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Skeleton>
  )
}
