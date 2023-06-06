import { Box, Text, Image, Spinner, Heading } from '@chakra-ui/react'
import { useLeagueInfo } from './use-league-info'

export const LeagueInfo = () => {
  const { data, isLoading } = useLeagueInfo()

  if (isLoading) {
    return <Spinner color='blue.500' />
  }

  if (!data) return <Box />

  return (
    <Box>
      <Image boxSize='300px' src={data.logo} alt='League logo' />
      <Heading size='md'>{data.name}</Heading>
      <Text fontSize='md'>League Level: {data.leagueLevel}</Text>
    </Box>
  )
}
