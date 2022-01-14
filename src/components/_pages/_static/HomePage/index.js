import styles from "@styles/Home.module.css"
import Estimator from "@components/_common/estimator";

import { Page } from '@lib/page'

import * as metaConfig from './meta'

export default function HomePage() {

  return (
    <Page metaConfig={metaConfig}>

      <h1 className={styles.title}>Traffic <a href="">Estimator!</a></h1>
      <p className={styles.description}>Get live traffic, For better decision</p>
      <Estimator/>

    </Page>
  )
}
