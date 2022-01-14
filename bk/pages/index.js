import React from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Estimator from "@components/estimator";

export async function getServerSideProps(context) {
  const url = process.env.DISTRANCE_MATRIX_API_URL
  const key = process.env.GOOGLE_API_KEY
  console.log("url", url)
  console.log("key", key)
  console.log("process.env.DB_HOST", process.env.DB_HOST)
  
  return { 
    props: {
      api:{
        url,
        key
      }
    }
  }
}


export default function Home({ api }) {
  console.log("Home api", api)
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

        <Estimator api={api}/>

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







