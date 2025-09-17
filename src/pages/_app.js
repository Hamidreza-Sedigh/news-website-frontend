import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function App({ Component, pageProps }) {
  return (
    <div dir="rtl" className="font-vazir min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}
