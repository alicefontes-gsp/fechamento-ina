"use client"

import styles from "./RiskBadge.module.css"

interface RiskBadgeProps {
  risk: "critical" | "high" | "medium" | "low"
}

const riskLabels = {
  critical: "🔴 Crítico",
  high: "🟠 Alto",
  medium: "🔵 Médio",
  low: "🟢 Baixo",
}

export default function RiskBadge({ risk }: RiskBadgeProps) {
  return <span className={`${styles.badge} ${styles[risk]}`}>{riskLabels[risk]}</span>
}
