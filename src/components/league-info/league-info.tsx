import {
  Box,
  Image,
  Wrap,
  Stack,
  Spinner,
  Heading,
  Link,
  HStack,
} from '@chakra-ui/react'
import { useLeagueInfo } from './use-league-info'
import { useTeams } from './use-teams'
import { groupBy } from '../utils/group-by'

export const LeagueInfo = () => {
  const { data, isLoading } = useLeagueInfo()
  const extraTeamData = useTeams()

  if (isLoading) {
    return <Spinner color='blue.500' />
  }

  if (!extraTeamData) return <Box />

  const groupedTeams = groupBy(extraTeamData, 'division')

  return (
    <Stack spacing='4'>
      {data && <Image w='500px' src={data.image} alt='League logo' />}
      {extraTeamData && (
        <Wrap maxW='500px' w='100%' spacing='4' justify='center'>
          {Object.keys(groupedTeams).map((division) => (
            <Box key={division}>
              <Heading size='sm'>{division}</Heading>
              <Stack spacing='0' w='230px'>
                {groupedTeams[division].map((team) => (
                  <HStack key={team.name}>
                    <Image boxSize='12px' src={team.logo} alt={team.name} />
                    <Link href={team.link} isExternal>
                      {team.name}
                    </Link>
                  </HStack>
                ))}
              </Stack>
            </Box>
          ))}
        </Wrap>
      )}
    </Stack>
  )
}
