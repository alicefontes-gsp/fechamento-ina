"use client"

import styles from "./MetricCard.module.css"

interface MetricCardProps {
  title: string
  value: string
  change: number
  icon: string
  accent: "primary" | "secondary" | "warning" | "info" | "danger"
}

export default function MetricCard({
  title,
  value,
  change,
  icon,
  accent,
}: MetricCardProps) {
  const isPositive = change >= 0

  return (
    <div className={`${styles.card} ${styles[accent]}`}>
      <div className={styles.header}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.change}>
          <span className={isPositive ? styles.positive : styles.negative}>
            {isPositive ? "↑" : "↓"} {Math.abs(change)}%
          </span>
        </div>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.value}>{value}</div>
    </div>
  )
}
