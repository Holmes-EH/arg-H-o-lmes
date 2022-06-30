import '../styles/globals.css'
import { AppWrapper } from '../components/context/store'

function MyApp({ Component, pageProps }) {
	return (
		<AppWrapper>
			<Component {...pageProps} />
		</AppWrapper>
	)
}

export default MyApp
