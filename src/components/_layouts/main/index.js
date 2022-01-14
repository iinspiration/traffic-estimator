import Notifications from './Notifications'
import Navigation from './Navigation'
import styles from '../../../../public/static/css/Home.module.css'

export default function MainLayout({ children }) {
  return (
    <div css={{ maxWidth: 960, margin: '0 auto' }}>
      <main className={styles.container}>{children}</main>
      <footer className={styles.footer}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
          Traffic Estimator System @2022
          </a>
        </footer>
    </div>
  )
}
