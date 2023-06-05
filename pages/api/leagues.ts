export type Team = {
  name: string
  GP: number
  W: number
  L: number
  OTW: number
  OTL: number
  GF: number
  GA: number
  postSeason: string
  division: string
  extra: {
    logo: string
    founded: number
    arena: {
      name: string
      location: string
      capacity: number
      yearOfConstruction: number
    }
    colors: string
    links: {
      officialWebUrl: string
    }
  }
}

export default function getTeams(): Team[] {
  const teams: Team[] = [
    {
      name: 'Boston Bruins',
      GP: 82,
      W: 54,
      L: 12,
      OTW: 11,
      OTL: 5,
      GF: 305,
      GA: 177,
      postSeason: 'Conference QF loss',
      division: 'Atlantic',
      extra: {
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Boston_Bruins.svg/1200px-Boston_Bruins.svg.png',
        founded: 1924,
        arena: {
          name: 'TD Garden',
          location: 'Boston, MA',
          capacity: 17565,
          yearOfConstruction: 1995,
        },
        colors: 'Black, Gold, White',
        links: {
          officialWebUrl: 'https://www.nhl.com/bruins',
        },
      },
    },
    {
      name: 'New York Rangers',
      GP: 82,
      W: 52,
      L: 14,
      OTW: 9,
      OTL: 7,
      GF: 290,
      GA: 180,
      postSeason: 'Conference SF loss',
      division: 'Metropolitan',
      extra: {
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Boston_Bruins.svg/1200px-Boston_Bruins.svg.png',
        founded: 1924,
        arena: {
          name: 'TD Garden',
          location: 'Boston, MA',
          capacity: 17565,
          yearOfConstruction: 1995,
        },
        colors: 'Black, Gold, White',
        links: {
          officialWebUrl: 'https://www.nhl.com/bruins',
        },
      },
    },
    {
      name: 'Montreal Canadiens',
      GP: 82,
      W: 50,
      L: 18,
      OTW: 8,
      OTL: 6,
      GF: 275,
      GA: 185,
      postSeason: 'Division Finals loss',
      division: 'Atlantic',
      extra: {
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Boston_Bruins.svg/1200px-Boston_Bruins.svg.png',
        founded: 1924,
        arena: {
          name: 'TD Garden',
          location: 'Boston, MA',
          capacity: 17565,
          yearOfConstruction: 1995,
        },
        colors: 'Black, Gold, White',
        links: {
          officialWebUrl: 'https://www.nhl.com/bruins',
        },
      },
    },
    {
      name: 'Philadelphia Flyers',
      GP: 82,
      W: 46,
      L: 20,
      OTW: 10,
      OTL: 6,
      GF: 265,
      GA: 210,
      postSeason: 'Conference SF loss',
      division: 'Metropolitan',
      extra: {
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Boston_Bruins.svg/1200px-Boston_Bruins.svg.png',
        founded: 1924,
        arena: {
          name: 'TD Garden',
          location: 'Boston, MA',
          capacity: 17565,
          yearOfConstruction: 1995,
        },
        colors: 'Black, Gold, White',
        links: {
          officialWebUrl: 'https://www.nhl.com/bruins',
        },
      },
    },
    {
      name: 'Detroit Red Wings',
      GP: 82,
      W: 44,
      L: 24,
      OTW: 8,
      OTL: 6,
      GF: 255,
      GA: 220,
      postSeason: 'Conference QF loss',
      division: 'Central',
      extra: {
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Boston_Bruins.svg/1200px-Boston_Bruins.svg.png',
        founded: 1924,
        arena: {
          name: 'TD Garden',
          location: 'Boston, MA',
          capacity: 17565,
          yearOfConstruction: 1995,
        },
        colors: 'Black, Gold, White',
        links: {
          officialWebUrl: 'https://www.nhl.com/bruins',
        },
      },
    },
    {
      name: 'Chicago Blackhawks',
      GP: 82,
      W: 40,
      L: 28,
      OTW: 9,
      OTL: 5,
      GF: 245,
      GA: 230,
      postSeason: 'Conference Finals loss',
      division: 'Central',
      extra: {
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Boston_Bruins.svg/1200px-Boston_Bruins.svg.png',
        founded: 1924,
        arena: {
          name: 'TD Garden',
          location: 'Boston, MA',
          capacity: 17565,
          yearOfConstruction: 1995,
        },
        colors: 'Black, Gold, White',
        links: {
          officialWebUrl: 'https://www.nhl.com/bruins',
        },
      },
    },
    {
      name: 'Pittsburgh Penguins',
      GP: 82,
      W: 42,
      L: 26,
      OTW: 8,
      OTL: 6,
      GF: 250,
      GA: 235,
      postSeason: 'Stanley Cup Champions',
      division: 'Metropolitan',
      extra: {
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Boston_Bruins.svg/1200px-Boston_Bruins.svg.png',
        founded: 1924,
        arena: {
          name: 'TD Garden',
          location: 'Boston, MA',
          capacity: 17565,
          yearOfConstruction: 1995,
        },
        colors: 'Black, Gold, White',
        links: {
          officialWebUrl: 'https://www.nhl.com/bruins',
        },
      },
    },
  ]

  return teams
}
