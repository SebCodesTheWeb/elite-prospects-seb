'use client';
import styles from './page.module.css'
import { useState, useEffect } from 'react';
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender } from '@tanstack/react-table'


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

const defaultData: Team[] = [
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
]

const columnHelper = createColumnHelper<Team>()

const columns = [
  columnHelper.accessor('name', {
    cell: info => info.getValue(),
    header: () => <span>Team</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('GP', {
    header: () => 'Games Played',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('W', {
    header: 'Wins',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('L', {
    header: 'Losses',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('OTW', {
    header: 'Overtime Wins',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('OTL', {
    header: 'Overtime Losses',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('GF', {
    header: 'Goals For',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('GA', {
    header: 'Goals Against',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('postSeason', {
    header: 'Post Season',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
]


export default function Home() {
  const [data, setData] = useState(() => [...defaultData])

  useEffect(() => {
    const fetchTeamData = async () => {
      const response = await fetch("/api/nhl");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log({data})
    };

    fetchTeamData()
      .catch(e => console.error('There was an error!', e));
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div className="p-2">
          <table>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map(footerGroup => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
        </div>
      </div>
    </main>
  )
}