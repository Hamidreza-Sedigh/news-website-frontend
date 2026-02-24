import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/context/AuthContext'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div dir="rtl" className="font-vazir min-h-screen flex flex-col">
        
        {/* 🔔 Toast Container */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: 'Vazir',
            },
          }}
        />

        <Header />

        <main className="flex-1">
          <Component {...pageProps} />
        </main>

        <Footer />
      </div>
    </AuthProvider>
  )
}