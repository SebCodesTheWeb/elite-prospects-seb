import { Country, Links, Logo } from './shared-types'

export type Team = {
  id: number
  name: string
  GP: number
  W: number
  L: number
  OTW: number
  OTL: number
  GF: number
  GA: number
  '+/-': number
  TP: number
  PGP: number
  postSeason: string
  division: string
  logo: string
  founded: number
  city: string
  arena: string
  country: string
  colors: string
}

export type TeamStatsData = {
  team: {
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
    league: string
    secondaryLeague: string
    teamType: string
    teamClass: string
    country: Country
    continent: string
    arena: string
    secondaryArena: string
    capHit: string
    views: number
    links: Links
    notes: string
    updatedAt: string
    _links: string[]
  }
  group: string
  stats: {
    GP: number
    W: number
    L: number
    T: number
    OTW: number
    OTL: number
    PTS: number
    GF: number
    GA: number
    GD: number
    PPG: number
  }
  postseason: string
}
