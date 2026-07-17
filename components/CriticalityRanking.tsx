"use client"

import { useMemo } from "react"
import { dashboardData } from "@/data/dashboardData"
import RiskBadge from "./RiskBadge"
import styles from "./CriticalityRanking.module.css"

interface CriticalityRankingProps {
  selectedUnit: string
}

function formatCurrency(value: number) {
  return `R$ ${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function formatPp(value: number) {
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} p.p.`
}

export default function CriticalityRanking({ selectedUnit }: CriticalityRankingProps) {
  const ranking = useMemo(() => {
    const items = dashboardData.criticality
    if (selectedUnit === "great-schools") {
      return items
    }
    return items.filter((item) => item.id === selectedUnit)
  }, [selectedUnit])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Ranking de criticidade por unidade</h2>
        <span className={styles.count}>{ranking.length} unidades acima da meta</span>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Posição</th>
              <th>Unidade</th>
              <th>INA</th>
              <th>Meta</th>
              <th>Distância</th>
              <th>Impacto R$</th>
              <th>Principal composição</th>
              <th>Risco</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((item, index) => (
              <tr key={item.id} className={styles[`risk-${item.risk}`]}>
                <td className={styles.position}>{index + 1}</td>
                <td>{item.unit}</td>
                <td>{item.inaPercent.toFixed(2).replace(".", ",")}%</td>
                <td>{item.metaPercent.toFixed(2).replace(".", ",")}%</td>
                <td className={styles.days}>{formatPp(item.distancePp)}</td>
                <td className={styles.amount}>{formatCurrency(item.distanceAmount)}</td>
                <td>{item.mainService}</td>
                <td>
                  <RiskBadge risk={item.risk} />
                </td>
              </tr>
            ))}
            {ranking.length === 0 && (
              <tr>
                <td colSpan={8}>Unidade selecionada atingiu a meta no fechamento atual.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
