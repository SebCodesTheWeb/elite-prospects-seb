'use client'
import { HStack, Center } from '@chakra-ui/react'
import { StandingsTable } from '@/components/standings-table/standings-table'
import { LeagueInfo } from '@/components/league-info/league-info'

export default function Home() {
  return (
    <main>
      <Center w='100%' h='100vh' p='4'>
        <HStack spacing='8' alignItems='top'>
          <LeagueInfo />
          <StandingsTable />
        </HStack>
      </Center>
    </main>
  )
}
