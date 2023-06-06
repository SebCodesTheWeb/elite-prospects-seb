'use client'
import { Stack, Center, Heading } from '@chakra-ui/react'
import { StandingsTable } from '@/components/standings-table/standings-table'
import { LeagueInfo } from '@/components/league-info/league-info'

export default function Home() {
  return (
    <main>
      <Center w='100%' h='100vh' p='4'>
        <Stack>
          <Heading>NHL Standings</Heading>
           <LeagueInfo /> 
          <StandingsTable />
        </Stack>
      </Center>
    </main>
  )
}
