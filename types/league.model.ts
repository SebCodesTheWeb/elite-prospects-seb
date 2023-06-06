type FlagURLs = {
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

type Country = {
  slug: string
  name: string
  iso_3166_1_alpha_2: string
  flagUrl: FlagURLs
  updatedAt: string
  _links: string[]
}

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
  flagUrl: FlagURLs
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
