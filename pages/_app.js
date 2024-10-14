import "@/styles/globals.css";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout ??
    ((page) => <main className={ubuntu.className}>{page}</main>);
  return (
    <div className={ubuntu.className}>
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}
