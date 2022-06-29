import Image from 'next/image'
import styles from '../styles/Loader.module.css'

const Loader = () => {
	return (
		<div className={styles.ocean}>
			<div className={styles.imageContainer}>
				<Image
					alt='The Argo - bronze'
					src='/argo.png'
					layout='fixed'
					priority
					width={100}
					height={100}
				/>
			</div>
			<div className={styles.wave}></div>
			<div className={styles.wave}></div>
		</div>
	)
}

export default Loader
