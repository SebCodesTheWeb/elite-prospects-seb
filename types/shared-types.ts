
export type Links = {
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

export type Logo = {
  small: string
  medium: string
  large?: string
}

export type FlagUrl = {
  small: string
  medium: string
}

export type Country = {
  slug: string
  name: string
  iso_3166_1_alpha_2: string
  flagUrl: FlagUrl
  updatedAt: string
  _links: string[]
}

export type Arena = {
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

export type League = {
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