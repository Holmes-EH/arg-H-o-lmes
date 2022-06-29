import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState, useEffect } from 'react'
import { globalContext } from '../components/context/store'
import dispatchReqError from '../lib/dispatchReqError'

import Loader from '../components/Loader'
import axios from 'axios'

type Props = {
	savedMembers: { name: string; _id: string }[]
}

const Home: NextPage = ({ savedMembers }: Props) => {
	const [state, dispatch] = globalContext()
	const { loading } = state

	const [members, setMembers] = useState<Array<string>>(savedMembers)
	const [newMember, setNewMember] = useState<String>('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		dispatch({ type: 'LOADING' })
		try {
			const { data } = await axios.post('/api/members', {
				name: newMember,
			})
			const newMemberList = [...members]
			newMemberList.push(data)
			console.log(newMemberList)
			setNewMember('')
			setMembers(newMemberList)
			setTimeout(() => {
				dispatch({ type: 'DONE_LOADING' })
			}, 1000)
		} catch (error) {
			dispatchReqError(dispatch, error)
		}
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>ARGO - Samuel Holmes</title>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
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
			<header className={styles.header}>
				<div className={styles.headerImage}>
					<Image
						alt='The Argo - bronze'
						src='/argo.png'
						layout='fixed'
						priority
						width={150}
						height={150}
					/>
				</div>
				<h1>Les Argonautes</h1>
			</header>
			<main className={styles.main}>
				<div className={styles.addMember}>
					<h2>Ajouter un(e) Argonaute</h2>
					<form
						className={styles.newMemberForm}
						onSubmit={handleSubmit}
					>
						<label htmlFor='name'>Nom de l&apos;Argonaute </label>
						<input
							id='name'
							name='name'
							type='text'
							value={newMember}
							placeholder='Charalampos'
							onChange={(e) => {
								setNewMember(e.target.value)
							}}
						/>
						<button type='submit'>Envoyer</button>
					</form>
				</div>
				<div className={styles.members}>
					<h2>Membres de l'équipage</h2>
					{loading ? (
						<Loader />
					) : (
						<section className={styles.memberList}>
							{members.map((member, index) => {
								return (
									<div
										className={styles.memberItem}
										key={member._id}
									>
										{member.name}
									</div>
								)
							})}
						</section>
					)}
				</div>
			</main>
			<footer className={styles.footer}>
				{loading ? (
					<>
						<p>
							Jason navigue vers la base de données pour récupérer
							la liste des équipiers
						</p>
						<p>Merci de patienter ...</p>
					</>
				) : (
					<>
						<p>
							Réalisé par{' '}
							<a
								href='https://samuelholmes.tech'
								target='_blank'
								rel='noopener noreferrer'
							>
								Samuel Holmes
							</a>{' '}
							en Hekatombaion de l'an 2022 après JC
						</p>
						<p>
							<em>
								Génial ce que l'on trouve sur{' '}
								<a
									href='https://greekerthanthegreeks.com/2019/07/hekatombaion-the-ancient-athenian-month-of-july-and-first-month-of-the-year-in-ancient-greece.html'
									target='_blank'
									rel='noopener noreferrer'
								>
									le web
								</a>
							</em>
						</p>
					</>
				)}
			</footer>
		</div>
	)
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
	const res = await fetch(`http://localhost:3000/api/members`)
	const savedMembers = await res.json()

	return { props: { savedMembers }, revalidate: 10 }
}
