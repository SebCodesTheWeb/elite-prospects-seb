// File: /pages/api/teams.ts

import { NextApiRequest, NextApiResponse } from 'next'

// Define your data structure
type Team = {
  name: string;
  GP: number;
  W: number;
  L: number;
  OTW: number;
  OTL: number;
  GF: number;
  GA: number;
  postSeason: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
        postSeason: 'Conference QF loss'
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
        postSeason: 'Conference SF loss'
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
        postSeason: 'Division Finals loss'
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
        postSeason: 'Conference SF loss'
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
        postSeason: 'Conference QF loss'
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
        postSeason: 'Conference Finals loss'
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
        postSeason: 'Stanley Cup Champions'
      }
  ];

  res.status(200).json(teams);
}
