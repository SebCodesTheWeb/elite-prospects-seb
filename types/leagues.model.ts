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
  id: number
  season: {
    slug: string
    startYear: number
    endYear: number
  }
  team: {
    id: number
    name: string
    extraName: string
    fullName: string
    logo: {
      small: string
      medium: string
      large: string
    }
    logoUrl: string
    founded: number
    city: string
    colors: string
    status: string
    league: string
    secondaryLeague: string
    teamType: string
    teamClass: string
    country: { name: string }
    continent: string
    arena: string
    secondaryArena: string
    capHit: string
    views: number
    links: {
      eliteprospectsUrl: string
      officialWebUrl: string
      newsUrl: string
      newspaperUrl: string
      tvUrl: string
      radioUrl: string
      blogUrl: string
      forumUrl: string
      facebook: string
      twitter: string
      instagram: string
      youtube: string
      nationNetworkUrl: string
    }
    notes: string
    updatedAt: string
    _links: string[]
  }
  teamName: string
  teamLogo: {
    small: string
    medium: string
    large: string
  }
  teamLogoUrl: string
  league: {
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
    flagUrl: {
      small: string
      medium: string
    }
    logoUrl: string
    imageUrl: string
    existsInLeagueEndpoint: boolean
    links: {
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
    updatedAt: string
    _links: string[]
  }
  leagueName: string
  leagueFullName: string
  leagueType: string
  group: string
  position: string
  medalClass: string
  playoffMedalClass: string
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
  info: string
  updatedAt: string
}
