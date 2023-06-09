import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import { SessionProvider  } from '../components/SessionProvider'
import { getServerSession   } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import Login from '@/components/Login'
import ClientProvider from '@/components/ClientProvider'

const inter = Inter({ subsets: ['latin'] })   

export const metadata = {
  title: 'ChatGPT Clone',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const serverSession = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={serverSession}>
          {!serverSession ? (
            <Login />  
          ): (
            <div className='flex'>
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[15rem]">
                <Sidebar /> 
              </div>
              
              {/* ClientProvider - Notifciation */} 
              <ClientProvider />
  
              <div className='bg-[#343541] flex-1'>{children}</div>
            </div> 
          )}     
        </SessionProvider>
      </body>
    </html> 
  )
}
