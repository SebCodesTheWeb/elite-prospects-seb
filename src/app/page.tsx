'use client'
import { HStack, Center } from '@chakra-ui/react'
import { StandingsTable } from '@/components/standings-table/standings-table'
import { LeagueInfo } from '@/components/league-info/league-info'
import { Header } from '@/components/header/header'

export default function Home() {
  return (
    <main>
      <Header />
      <Center w='100%' p="8">
        <HStack spacing='8' alignItems='top'>
          <LeagueInfo />
          <StandingsTable />
        </HStack>
      </Center>
    </main>
  )
}
