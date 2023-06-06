import { Links } from './shared-types'

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
