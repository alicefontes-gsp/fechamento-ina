"use client"

import { useMemo } from "react"
import { DashboardData } from "@/types/dashboard"
import MetricCard from "./MetricCard"
import styles from "./MetricsGrid.module.css"

interface MetricsGridProps {
  data: DashboardData
  selectedUnit: string
}

function formatCurrency(value: number) {
  return `R$ ${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function formatPercent(value: number) {
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%`
}

function formatPp(value: number) {
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} p.p.`
}

export default function MetricsGrid({ data, selectedUnit }: MetricsGridProps) {
  const metrics = useMemo(() => data.unitMetrics[selectedUnit], [data, selectedUnit])

  if (!metrics) return null

  const reachedGoal = metrics.distancePp <= 0

  return (
    <div className={styles.metricsGrid}>
      <MetricCard
        title="Inadimplência atual (%)"
        value={formatPercent(metrics.inaPercent)}
        detail={`Meta 2026: ${formatPercent(metrics.metaPercent)}`}
        badge={formatPp(metrics.distancePp)}
        secondaryDetail={`INA 2025: ${formatPercent(metrics.ina2025Percent)}`}
        secondaryBadge={formatPp(metrics.inaPercent - metrics.ina2025Percent)}
        accent={reachedGoal ? "secondary" : "danger"}
        layout="ina"
        statusLabel={reachedGoal ? "Meta atingida" : "Meta não atingida"}
        statusReached={reachedGoal}
      />
      <MetricCard
        title="Inadimplência em R$"
        value={formatCurrency(metrics.inadimplencia)}
        detail="Valor acumulado"
        icon="💰"
        accent="primary"
      />
      <MetricCard
        title="Faturamento acumulado"
        value={formatCurrency(metrics.faturamento)}
        detail="Jan a Jun/2026"
        icon="📈"
        accent="info"
      />
      <MetricCard
        title="Total de inadimplentes"
        value={metrics.rfCount.toLocaleString("pt-BR")}
        detail="Responsáveis financeiros únicos"
        icon="👥"
        accent="primary"
      />
      <MetricCard
        title="Maior composição"
        value={metrics.mainService}
        detail="Tipo de serviço"
        icon="🎯"
        accent="secondary"
      />
    </div>
  )
}
