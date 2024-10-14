import '@/styles/globals.css';
import { PT_Sans } from 'next/font/google';

const ptSans = PT_Sans({
	weight: ['400', '700'],
	subsets: ['latin'],
});

export default function App({ Component, pageProps }) {
	const getLayout =
		Component.getLayout ||
		((page) => <main className={ptSans.className}>{page}</main>);

	return getLayout(<Component {...pageProps} />);
}
