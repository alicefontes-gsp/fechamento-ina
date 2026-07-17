"use client"

import { useMemo } from "react"
import { dashboardData } from "@/data/dashboardData"
import RiskBadge from "./RiskBadge"
import styles from "./CriticalityRanking.module.css"

interface CriticalityRankingProps {
  selectedUnit: string
}

export default function CriticalityRanking({ selectedUnit }: CriticalityRankingProps) {
  const sortedDebtors = useMemo(() => {
    const filtered =
      selectedUnit === "all"
        ? dashboardData.debtors
        : dashboardData.debtors.filter((d) =>
            d.unit.toLowerCase().includes(selectedUnit.replace("-", " "))
          )
    return filtered.sort((a, b) => b.amount - a.amount)
  }, [selectedUnit])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Ranking de Criticidade</h2>
        <span className={styles.count}>{sortedDebtors.length} devedores</span>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Posição</th>
              <th>Devedor</th>
              <th>Unidade</th>
              <th>Serviço</th>
              <th>Débito</th>
              <th>Dias em Atraso</th>
              <th>Risco</th>
            </tr>
          </thead>
          <tbody>
            {sortedDebtors.map((debtor, index) => (
              <tr key={debtor.id} className={styles[`risk-${debtor.risk}`]}>
                <td className={styles.position}>{index + 1}</td>
                <td>{debtor.name}</td>
                <td>{debtor.unit}</td>
                <td>{debtor.service}</td>
                <td className={styles.amount}>
                  R$ {debtor.amount.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className={styles.days}>{debtor.daysOverdue} dias</td>
                <td>
                  <RiskBadge risk={debtor.risk} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
