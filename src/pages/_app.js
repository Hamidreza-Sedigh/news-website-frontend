import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div dir="rtl" className="font-vazir">
      <Component {...pageProps} />
    </div>
  );
}
