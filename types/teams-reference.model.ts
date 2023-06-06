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

export type TeamsReference = {
    logoUrl: string
    links: Links
    id: number
}[]

export type DerivedTeamsReference = {
    id: number
    logo: string
    link: string
}[]