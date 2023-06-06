'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { flexRender } from '@tanstack/react-table'
import {
  Table,
  SkeletonText,
  Tbody,
  Thead,
  Stack,
  Tr,
  Th,
  Td,
  Link,
  TableContainer,
  Grid,
  Icon,
  GridItem,
  Box,
  Image,
  Text,
  HStack,
  Skeleton,
  Heading,
} from '@chakra-ui/react'
import { useStandingsTable } from './use-standings-table'
import { ExternalLinkIcon } from '@chakra-ui/icons'

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
                            <Box
                              padding='4'
                              boxShadow='md'
                              borderWidth='1px'
                              borderRadius='lg'
                              bgColor='white'
                              h='150px'
                            >
                              <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                                <GridItem colSpan={1}>
                                  <Image
                                    src={teamData.logo}
                                    alt={`${teamData.name} logo`}
                                    h='100px'
                                  />
                                </GridItem>
                                <GridItem colSpan={2}>
                                  <Stack spacing='1'>
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
                                  </Stack>
                                </GridItem>

                                <GridItem colSpan={2}>
                                  <Stack justify='space-between' h='100%'>
                                    <Stack spacing='1'>
                                      <Text>
                                        <b>Colors:</b> {teamData.colors}
                                      </Text>
                                      <Text>
                                        <b>Arena:</b> {teamData.arena.name} in{' '}
                                        {teamData.arena.location} <br />
                                      </Text>
                                    </Stack>
                                    <HStack spacing='4'>
                                      <Link
                                        isExternal={true}
                                        href={teamData.links.officialWebUrl}
                                        color='blue.500'
                                        textDecoration='underline'
                                      >
                                        Official webpage{' '}
                                        <Icon as={ExternalLinkIcon} pb='1' />
                                      </Link>
                                      <Link
                                        isExternal={true}
                                        href={teamData.links.eliteprospectsUrl}
                                        color='blue.500'
                                        textDecoration='underline'
                                      >
                                        Elite Prospects page{' '}
                                        <Icon as={ExternalLinkIcon} pb='1' />
                                      </Link>
                                    </HStack>
                                  </Stack>
                                </GridItem>
                              </Grid>
                            </Box>
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
