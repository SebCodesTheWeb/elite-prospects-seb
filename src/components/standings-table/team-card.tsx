'use client'
import React from 'react'
import {
  Stack,
  Link,
  Grid,
  Icon,
  GridItem,
  Box,
  Image,
  Text,
  HStack,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { DerivedTeamData } from '../../../types/team.model'

export const TeamCard = ({ teamData }: { teamData: DerivedTeamData }) => {
  return (
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
          <Image src={teamData.logo} alt={`${teamData.name} logo`} h='100px' />
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
                <b>Arena:</b> {teamData.arena.name} in {teamData.arena.location}{' '}
                <br />
              </Text>
            </Stack>
            <HStack spacing='4'>
              <Link
                isExternal={true}
                href={teamData.links.officialWebUrl}
                color='blue.500'
                textDecoration='underline'
              >
                Official webpage <Icon as={ExternalLinkIcon} pb='1' />
              </Link>
              <Link
                isExternal={true}
                href={teamData.links.eliteprospectsUrl}
                color='blue.500'
                textDecoration='underline'
              >
                Elite Prospects page <Icon as={ExternalLinkIcon} pb='1' />
              </Link>
            </HStack>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  )
}
