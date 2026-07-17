"use client"

import styles from "./MetricCard.module.css"

interface MetricCardProps {
  title: string
  value: string
  detail?: string
  icon: string
  accent: "primary" | "secondary" | "warning" | "info" | "danger"
}

export default function MetricCard({
  title,
  value,
  detail,
  icon,
  accent,
}: MetricCardProps) {
  return (
    <div className={`${styles.card} ${styles[accent]}`}>
      <div className={styles.header}>
        <div className={styles.icon}>{icon}</div>
        {detail && <div className={styles.change}>{detail}</div>}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.value}>{value}</div>
    </div>
  )
}
