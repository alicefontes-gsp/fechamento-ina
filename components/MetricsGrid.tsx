"use client"

import { useMemo } from "react"
import { dashboardData } from "@/data/dashboardData"
import MetricCard from "./MetricCard"
import styles from "./MetricsGrid.module.css"

interface MetricsGridProps {
  selectedUnit: string
}

export default function MetricsGrid({ selectedUnit }: MetricsGridProps) {
  const metrics = useMemo(() => {
    const unitData = dashboardData.unitMetrics[selectedUnit]

    if (!unitData) return null

    const paymentRate = unitData.totalDebt
      ? ((unitData.paidAmount / unitData.totalDebt) * 100).toFixed(1)
      : "0"

    return {
      totalDebt: unitData.totalDebt,
      paidAmount: unitData.paidAmount,
      pendingAmount: unitData.pendingAmount,
      debtors: unitData.debtors,
      averageDebt: unitData.averageDebt,
      paymentRate: parseFloat(paymentRate),
      riskLevel: unitData.riskLevel,
    }
  }, [selectedUnit])

  if (!metrics) return null

  return (
    <div className={styles.metricsGrid}>
      <MetricCard
        title="Débito Total"
        value={`R$ ${metrics.totalDebt.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        change={-2.3}
        icon="💰"
        accent="primary"
      />
      <MetricCard
        title="Valor Recebido"
        value={`R$ ${metrics.paidAmount.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        change={5.7}
        icon="✓"
        accent="secondary"
      />
      <MetricCard
        title="Pendente"
        value={`R$ ${metrics.pendingAmount.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        change={-3.1}
        icon="⚠"
        accent="warning"
      />
      <MetricCard
        title="Taxa de Pagamento"
        value={`${metrics.paymentRate}%`}
        change={2.4}
        icon="📊"
        accent="info"
      />
      <MetricCard
        title="Total de Devedores"
        value={metrics.debtors.toString()}
        change={-1}
        icon="👥"
        accent="primary"
      />
      <MetricCard
        title="Débito Médio"
        value={`R$ ${metrics.averageDebt.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        change={0.8}
        icon="📈"
        accent="secondary"
      />
    </div>
  )
}
