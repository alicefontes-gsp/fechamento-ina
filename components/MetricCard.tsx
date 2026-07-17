"use client"

import styles from "./MetricCard.module.css"

interface MetricCardProps {
  title: string
  value: string
  detail?: string
  badge?: string
  secondaryDetail?: string
  secondaryBadge?: string
  icon?: string
  accent: "primary" | "secondary" | "warning" | "info" | "danger"
  layout?: "default" | "ina"
  statusLabel?: string
  statusReached?: boolean
}

function badgeClass(value?: string) {
  return value?.trim().startsWith("-") ? styles.ppBadgeGood : styles.ppBadgeBad
}

export default function MetricCard({
  title,
  value,
  detail,
  badge,
  secondaryDetail,
  secondaryBadge,
  icon,
  accent,
  layout = "default",
  statusLabel,
  statusReached = false,
}: MetricCardProps) {
  if (layout === "ina") {
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

        <div className={styles.inaComparisons}>
          <div className={styles.comparisonBlock}>
            {detail && <div className={styles.metaLine}>{detail}</div>}
            {badge && <div className={`${styles.ppBadge} ${badgeClass(badge)}`}>{badge}</div>}
          </div>

          <div className={`${styles.comparisonBlock} ${styles.comparisonRight}`}>
            {secondaryDetail && <div className={styles.metaLine}>{secondaryDetail}</div>}
            {secondaryBadge && <div className={`${styles.ppBadge} ${badgeClass(secondaryBadge)}`}>{secondaryBadge}</div>}
          </div>
        </div>
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
