import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Traffic Estimator</title>
        <meta name="description" content="Traffic Estimatorapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
         Traffic <a href="">Estimator!</a>
        </h1>

        <p className={styles.description}>
         Get live traffic, For better decision
        </p>

        <div className={styles.grid}>



        </div>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
         Traffic Estimator System @2022
        </a>
      </footer>
    </div>
  )
}
