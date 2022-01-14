import { Fragment } from 'react'
import { useTheme } from '@emotion/react'
import { Flex, Box } from '@grid'
import styles from '../../../../../public/static/css/Home.module.css'
import Estimator from "@components/_common/estimator";

import { Page } from '@lib/page'
import { Fetch, FetchMore } from '@lib/api'
import * as ArticleService from '@modules/article/services'

import PopularArticles from '@components/_pages/article/ArticleDetailPage/PopularArticles'
import ArticleLatest, { ArticleList } from './ArticleLatest'
import * as metaConfig from './meta'

export default function HomePage({ articleLatest }) {
  const { variables } = useTheme()

  return (
    <Page metaConfig={metaConfig}>

      <h1 className={styles.title}>Traffic <a href="">Estimator!</a></h1>
      <p className={styles.description}>Get live traffic, For better decision</p>
      <Estimator/>

    </Page>
  )
}
