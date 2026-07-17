"use client"

import { dashboardData } from "@/data/dashboardData"
import styles from "./Header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>📊</div>
          <div>
            <h1>Dashboard de Inadimplência</h1>
            <p>Fechamento mensal acumulado · Great Schools</p>
          </div>
        </div>
        <div className={styles.info}>
          <span className={styles.month}>{dashboardData.month} {dashboardData.year}</span>
        </div>
      </div>
    </header>
  )
}
