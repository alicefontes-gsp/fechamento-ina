"use client"

import { useMemo } from "react"
import { DashboardData } from "@/types/dashboard"
import styles from "./CriticalityRanking.module.css"

interface CriticalityRankingProps {
  data: DashboardData
  selectedUnit: string
}

const SERVICE_COLUMNS = [
  "Acordo",
  "Anuidade - 1ª parcela",
  "Complementos",
  "Curso Regular",
  "Material Didático",
  "Taxas, eventos e saídas",
]

function formatCurrency(value: number) {
  if (!value) return "—"

  return `R$ ${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function getServiceAmount(data: DashboardData, unitId: string, service: string) {
  return data.services[unitId]?.find((item) => item.service === service)?.amount || 0
}

export default function CriticalityRanking({ data, selectedUnit }: CriticalityRankingProps) {
  const rows = useMemo(() => {
    const units = selectedUnit === "great-schools"
      ? data.units.filter((unit) => unit.id !== "great-schools")
      : data.units.filter((unit) => unit.id === selectedUnit)

    return units.map((unit) => ({
      id: unit.id,
      unit: unit.shortName,
      metrics: data.unitMetrics[unit.id],
    })).filter((row) => row.metrics)
  }, [data, selectedUnit])

  const hasServiceValues = rows.some((row) => {
    return SERVICE_COLUMNS.some((service) => getServiceAmount(data, row.id, service) > 0)
  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Composição da inadimplência por unidade</h2>
        <span className={styles.count}>{data.month} {data.year}</span>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Unidade</th>
              <th>INA Total</th>
              <th>QT. RF</th>
              <th>Acordo</th>
              <th>Anuidade - 1ª parcela</th>
              <th>Complementos</th>
              <th>Curso Regular</th>
              <th>Material Didático</th>
              <th>Taxas, eventos e saídas</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className={styles.unitName}>{row.unit}</td>
                <td className={styles.amount}>{formatCurrency(row.metrics.inadimplencia)}</td>
                <td>{row.metrics.rfCount.toLocaleString("pt-BR")}</td>
                {SERVICE_COLUMNS.map((service) => (
                  <td key={service} className={styles.amount}>
                    {formatCurrency(getServiceAmount(data, row.id, service))}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={9}>Nenhuma unidade disponível para o mês selecionado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!hasServiceValues && (
        <p className={styles.pendingNote}>Aguardando dados de composição por serviço deste mês.</p>
      )}
    </div>
  )
}
