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
            <h1>Inadimplência Acumulada</h1>
            <p>
              Data de corte: {dashboardData.cutoffDate} / Data de atualização: {dashboardData.updateDate}
            </p>
          </div>
        </div>
        <div className={styles.info}>
          <span className={styles.month}>{dashboardData.month} {dashboardData.year}</span>
        </div>
      </div>
    </header>
  )
}
