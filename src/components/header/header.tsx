import { Flex, HStack, Heading, Icon, Image, Link } from '@chakra-ui/react'
import { AtSignIcon } from '@chakra-ui/icons'

export const Header = () => {
  return (
    <HStack
      w='100vw'
      bgColor='blue.800'
      h='100px'
      color='white'
      justify='space-between'
      p='8'
    >
      <Image
        w='100px'
        src='https://static.eliteprospects.com/images/ep-logo.svg'
        alt='elite-prospects-logo'
      />
      <Heading size='sm'>
        <Flex gap='1px'>
          <Icon as={AtSignIcon} />
          <Link isExternal={true} href='https://github.com/SebCodesTheWeb'>
            SebCodesTheWeb
          </Link>
        </Flex>
      </Heading>
    </HStack>
  )
}
