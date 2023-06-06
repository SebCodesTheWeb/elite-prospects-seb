import { Links, Logo, Country, Arena, League } from './shared-types'

export type TeamData = {
  id: number
  name: string
  extraName: string
  fullName: string
  logo: Logo
  logoUrl: string
  founded: number
  city: string
  colors: string
  status: string
  league: League
  secondaryLeague: League
  teamType: string
  teamClass: string
  country: Country
  continent: string
  arena: Arena
  secondaryArena: Arena
  capHit: string
  views: number
  links: Links
  notes: string
  updatedAt: string
  _links: string[]
}

export type DerivedTeamData = {
  isLoading: false
  name: string
  id: number
  logo: string
  teamType: string
  founded: number
  city: string
  arena: {
    name: string
    location: string
    yearOfConstruction: number
    capacity: number
  }
  capHit: string
  views: number
  country: string
  colors: string
  links: {
    eliteprospectsUrl: string
    officialWebUrl: string
  }
}

export type PlaceholderTeamData = {
  id: number
  isLoading: true
}
