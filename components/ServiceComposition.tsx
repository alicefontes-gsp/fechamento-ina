"use client"

import { useMemo } from "react"
import { DashboardData } from "@/types/dashboard"
import styles from "./ServiceComposition.module.css"

interface ServiceCompositionProps {
  data: DashboardData
  selectedUnit: string
}

const LIST_ORDER = ["Curso Regular", "Complementos", "Material Didático", "Acordo", "Taxas, eventos e saídas"]

const labelMap: Record<string, string> = {
  Acordo: "Acordos",
  "Taxas, eventos e saídas": "Taxas, saídas e eventos",
}

export default function ServiceComposition({ data, selectedUnit }: ServiceCompositionProps) {
  const { listData, hasValues } = useMemo(() => {
    const services = data.services[selectedUnit] || data.services["great-schools"]
    const total = services.reduce((sum, item) => sum + item.amount, 0)

    return {
      hasValues: total > 0,
      listData: LIST_ORDER.map((serviceName) => {
        const item = services.find((s) => s.service === serviceName)
        return {
          service: labelMap[serviceName] || serviceName,
          percentage: item?.percentage || 0,
        }
      }),
    }
  }, [data, selectedUnit])

  return (
    <section className={styles.container} aria-label="Composição da inadimplência por tipo de serviço">
      <p className={styles.eyebrow}>Composição da inadimplência</p>
      <h2 className={styles.title}>Por tipo de serviço</h2>

      <div className={styles.metricList}>
        {listData.map((item) => (
          <div className={styles.metricRow} key={item.service}>
            <span>{item.service}</span>
            <strong>{hasValues ? `${Math.round(item.percentage)}%` : "—"}</strong>
          </div>
        ))}
      </div>
      {!hasValues && <p className={styles.pendingNote}>Aguardando dados de composição por serviço deste mês.</p>}
    </section>
  )
}
