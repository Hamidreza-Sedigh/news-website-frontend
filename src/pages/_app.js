import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/context/AuthContext'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div dir="rtl" className="font-vazir min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
