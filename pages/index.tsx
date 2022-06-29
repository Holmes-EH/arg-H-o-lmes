import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState, useEffect } from 'react'

const Home: NextPage = () => {
	const [members, setMembers] = useState<Array<string>>([
		'Eleftheria',
		'Gennadios',
		'Lysimachos',
	])
	return (
		<div className={styles.container}>
			<Head>
				<title>ARGO - Samuel Holmes</title>
				<meta
					name='description'
					content='Dev Tech challenge pour WildCodeSchool - Samuel Holmes'
				/>
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon-16x16.png'
				/>
				<link rel='manifest' href='/site.webmanifest' />
			</Head>
			{/* <!-- Header section --> */}
			<header>
				<div>
					<Image
						alt='The Argo - bronze'
						src='/argo.png'
						layout='responsive'
						width={350}
						height={350}
					/>
				</div>
				<h1>Les Argonautes</h1>
			</header>

			<main className={styles.main}>
				{/* <!-- Main section --> */}
				<main>
					{/* <!-- New member form --> */}
					<h2>Ajouter un(e) Argonaute</h2>
					<form className='new-member-form'>
						<label htmlFor='name'>Nom de l&apos;Argonaute</label>
						<input
							id='name'
							name='name'
							type='text'
							placeholder='Charalampos'
						/>
						<button type='submit'>Envoyer</button>
					</form>

					{/* <!-- Member list --> */}
					<h2>Membres de l'équipage</h2>
					<section className='member-list'>
						{members.map((member, index) => {
							return (
								<div
									className='member-item'
									key={`member-${index}`}
								>
									{member}
								</div>
							)
						})}
					</section>
				</main>
			</main>
			<footer>
				<p>
					Réalisé par{' '}
					<a href='https://samuelholmes.tech'>Samuel Holmes</a> en
					Hĕkătŏmbaiṓn de l'an 2022 après JC
				</p>
			</footer>
		</div>
	)
}

export default Home
