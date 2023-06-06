type Logo = {
  small: string
  medium: string
  large?: string
}

type FlagUrl = {
  small: string
  medium: string
}

type Links = {
  eliteprospectsUrl: string
  officialWebUrl: string
  statsUrl: string
  newsUrls: string[]
  forumUrl: string
  facebook: string
  twitter: string
  instagram: string
  youtube: string
}

type League = {
  id: number
  slug: string
  name: string
  fullName: string
  commonName: string
  teamClass: string
  leagueLevel: string
  scheduleType: string
  country: string
  continent: string
  region: string
  flagUrl: FlagUrl
  logoUrl: string
  imageUrl: string
  existsInLeagueEndpoint: boolean
  links: Links
  updatedAt: string
  _links: string[]
}

type Country = {
  slug: string
  name: string
  iso_3166_1_alpha_2: string
  flagUrl: FlagUrl
  updatedAt: string
  _links: string[]
}

type Arena = {
  id: number
  name: string
  location: string
  yearOfConstruction: number
  capacity: number
  infoAsHTML: string
  imageUrl: string
  country: string
  updatedAt: string
  _links: string[]
}

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
