"use client"

import styles from "./MetricCard.module.css"

interface MetricCardProps {
  title: string
  value: string
  detail?: string
  badge?: string
  icon?: string
  accent: "primary" | "secondary" | "warning" | "info" | "danger"
  layout?: "default" | "ina"
  statusLabel?: string
  statusReached?: boolean
}

export default function MetricCard({
  title,
  value,
  detail,
  badge,
  icon,
  accent,
  layout = "default",
  statusLabel,
  statusReached = false,
}: MetricCardProps) {
  if (layout === "ina") {
    const isNegative = badge?.trim().startsWith("-")

    return (
      <div className={`${styles.card} ${styles.inaCard} ${styles[accent]}`}>
        {statusLabel && (
          <div className={styles.statusMarker}>
            <span className={statusReached ? styles.statusDotGood : styles.statusDotBad} />
            <strong>{statusLabel}</strong>
          </div>
        )}
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.value}>{value}</div>
        {detail && <div className={styles.metaLine}>{detail}</div>}
        {badge && (
          <div className={`${styles.ppBadge} ${isNegative ? styles.ppBadgeGood : styles.ppBadgeBad}`}>
            {badge}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`${styles.card} ${styles[accent]}`}>
      <div className={styles.header}>
        {icon && <div className={styles.icon}>{icon}</div>}
        {detail && <div className={styles.change}>{detail}</div>}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.value}>{value}</div>
    </div>
  )
}
