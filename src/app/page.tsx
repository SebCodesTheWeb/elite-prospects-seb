'use client'
import { Stack, Center, Heading } from '@chakra-ui/react'
import { StandingsTable } from '@/components/standings-table'

export default function Home() {
  return (
    <main>
      <Center w='100%' h='100vh' p='4'>
        <Stack>
          <Heading>NHL Standings</Heading>
          <StandingsTable />
        </Stack>
      </Center>
    </main>
  )
}
