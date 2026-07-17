"use client"

import { DashboardData } from "@/types/dashboard"
import styles from "./Header.module.css"

interface HeaderProps {
  data: DashboardData
}

export default function Header({ data }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <div>
            <h1>Inadimplência Acumulada</h1>
            <p>
              Data de corte: {data.cutoffDate} / Data de atualização: {data.updateDate}
            </p>
          </div>
        </div>
        <div className={styles.info}>
          <nav className={styles.monthNav} aria-label="Selecionar mês">
            <a className={data.month === "Maio" ? styles.monthLinkActive : styles.monthLink} href="/maio">Maio</a>
            <a className={data.month === "Junho" ? styles.monthLinkActive : styles.monthLink} href="/">Junho</a>
          </nav>
          <span className={styles.month}>{data.month} {data.year}</span>
        </div>
      </div>
    </header>
  )
}
