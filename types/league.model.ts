import { Country, FlagUrl, Links } from './shared-types'

export type LeagueType = {
  id: number
  slug: string
  name: string
  fullName: string
  commonName: string
  teamClass: string
  leagueLevel: string
  country: Country
  region: string
  flagUrl: FlagUrl
  logoUrl: string
  imageUrl: string
  existsInLeagueEndpoint: boolean
  links: Links
  updatedAt: string
  _links: string[]
}

export type DerivedLeagueType = {
  logo: string
  image: string
  name: string
  leagueLevel: string
}
