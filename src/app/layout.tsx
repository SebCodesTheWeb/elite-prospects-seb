import { ChakraProviders } from './providers'

export const metadata = {
  title: 'NHL Standings',
  description: 'NHL teams and standings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <ChakraProviders>{children}</ChakraProviders>
      </body>
    </html>
  )
}
