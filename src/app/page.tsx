'use client'
import { Stack, Center, Box } from '@chakra-ui/react'
import { StandingsTable } from '@/components/standings-table/standings-table'
import { LeagueInfo } from '@/components/league-info/league-info'
import { Header } from '@/components/header/header'
import { useMediaQuery } from '@chakra-ui/react'

export default function Home() {
  const [isDesktop] = useMediaQuery('(min-width: 1400px)')

  return (
    <main>
      <Header />
      <Center w='100%' p='8'>
        <Stack
          spacing='8'
          alignItems='top'
          direction={isDesktop ? 'row' : 'column-reverse'}
          maxW='100%'
          overflowX='hidden'
        >
          <Box alignSelf={isDesktop ? 'top' : 'center'}>
            <LeagueInfo />
          </Box>
          <StandingsTable />
        </Stack>
      </Center>
    </main>
  )
}
