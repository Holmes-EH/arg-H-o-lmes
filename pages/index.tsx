import type {
	NextPage,
	GetServerSideProps,
	InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../components/context/store'

import { BsGithub } from 'react-icons/bs'
import Loader from '../components/Loader'
import axios from 'axios'

type Member = {
	name: string
	_id: string
}
type NewMember = string

const Home: NextPage = ({
	savedMembers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const [state, dispatch] = useContext(AppContext)
	const { loading } = state

	const [members, setMembers] = useState<Array<Member>>(savedMembers)
	const [newMember, setNewMember] = useState<NewMember>('')

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		dispatch({ type: 'LOADING' })
		try {
			const { data } = await axios.post('/api/members', {
				name: newMember,
			})
			const newMemberList = [...members]
			newMemberList.push(data)
			setNewMember('')
			setMembers(newMemberList)
			setTimeout(() => {
				dispatch({ type: 'DONE_LOADING' })
			}, 1000)
		} catch (error: any) {
			dispatch({ type: 'DONE_LOADING' })
			dispatch({
				type: 'MESSAGE',
				payload: {
					type: 'error',
					text:
						error.response && error.response.data.message
							? error.response.data.message
							: error.message,
				},
			})
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
						onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}
					>
						<label htmlFor='name'>Nom de l&apos;Argonaute </label>
						<input
							id='name'
							name='name'
							type='text'
							required
							value={newMember}
							placeholder='Charalampos'
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							): void => {
								setNewMember(e.target.value)
							}}
						/>
						<button type='submit'>Envoyer</button>
					</form>
				</div>
				<div className={styles.members}>
					<h2>Membres de l&apos;équipage</h2>
					<small
						style={{
							textAlign: 'center',
							marginTop: '-22px',
							marginBottom: '1.5em',
						}}
					>
						{members.length} sur 50
					</small>
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
							en{' '}
							<a
								href='https://greekerthanthegreeks.com/2019/07/hekatombaion-the-ancient-athenian-month-of-july-and-first-month-of-the-year-in-ancient-greece.html'
								target='_blank'
								rel='noopener noreferrer'
							>
								Hekatombaion
							</a>{' '}
							de l&apos;an 2022 après JC
						</p>
						<p
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								gap: ' 1em',
							}}
						>
							<em>
								Retrouvez le code source{' '}
								<a
									href='https://github.com/Holmes-EH/arg-H-o-lmes'
									target='_blank'
									rel='noopener noreferrer'
								>
									ici
								</a>
							</em>
							<a
								href='https://github.com/Holmes-EH/arg-H-o-lmes'
								target='_blank'
								rel='noopener noreferrer'
							>
								<BsGithub style={{ fontSize: '2em' }} />
							</a>
						</p>
					</>
				)}
			</footer>
		</div>
	)
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await fetch(`${process.env.API_URI}/members`)
	const savedMembers: Member[] = await res.json()

	return { props: { savedMembers } }
}
