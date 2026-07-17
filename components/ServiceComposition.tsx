"use client"

import { useMemo } from "react"
import { dashboardData } from "@/data/dashboardData"
import styles from "./ServiceComposition.module.css"

interface ServiceCompositionProps {
  selectedUnit: string
}

const LIST_ORDER = ["Curso Regular", "Complementos", "Material Didático", "Acordo", "Taxas, eventos e saídas"]

const labelMap: Record<string, string> = {
  Acordo: "Acordos",
  "Taxas, eventos e saídas": "Taxas, saídas e eventos",
}

export default function ServiceComposition({ selectedUnit }: ServiceCompositionProps) {
  const listData = useMemo(() => {
    const services = dashboardData.services[selectedUnit] || dashboardData.services["great-schools"]

    return LIST_ORDER.map((serviceName) => {
      const item = services.find((s) => s.service === serviceName)
      return {
        service: labelMap[serviceName] || serviceName,
        percentage: item?.percentage || 0,
      }
    })
  }, [selectedUnit])

  return (
    <section className={styles.container} aria-label="Composição da inadimplência por tipo de serviço">
      <p className={styles.eyebrow}>Composição da inadimplência</p>
      <h2 className={styles.title}>Por tipo de serviço</h2>

      <div className={styles.metricList}>
        {listData.map((item) => (
          <div className={styles.metricRow} key={item.service}>
            <span>{item.service}</span>
            <strong>{Math.round(item.percentage)}%</strong>
          </div>
        ))}
      </div>
    </section>
  )
}
