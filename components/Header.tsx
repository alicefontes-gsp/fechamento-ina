"use client"

import styles from "./Header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>📊</div>
          <div>
            <h1>Dashboard de Inadimplência</h1>
            <p>Great Schools - Fechamento Mensal</p>
          </div>
        </div>
        <div className={styles.info}>
          <span className={styles.month}>Junho 2026</span>
        </div>
      </div>
    </header>
  )
}
