"use client"

import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { dashboardData } from "@/data/dashboardData"
import styles from "./ServiceComposition.module.css"

interface ServiceCompositionProps {
  selectedUnit: string
}

const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#06b6d4"]

const LIST_ORDER = ["Curso Regular", "Complementos", "Material Didático", "Acordo", "Taxas, eventos e saídas"]

const labelMap: Record<string, string> = {
  Acordo: "Acordos",
  "Taxas, eventos e saídas": "Taxas, saídas e eventos",
}

export default function ServiceComposition({ selectedUnit }: ServiceCompositionProps) {
  const selectedUnitName = useMemo(() => {
    return dashboardData.units.find((unit) => unit.id === selectedUnit)?.name || "Great Schools"
  }, [selectedUnit])

  const { chartData, listData } = useMemo(() => {
    const services = dashboardData.services[selectedUnit] || dashboardData.services["great-schools"]

    const chart = services.map((s) => ({
      name: s.service,
      value: s.amount,
      percentage: s.percentage,
    }))

    const list = LIST_ORDER.map((serviceName) => {
      const item = services.find((s) => s.service === serviceName)
      return {
        service: labelMap[serviceName] || serviceName,
        amount: item?.amount || 0,
        percentage: item?.percentage || 0,
      }
    })

    return { chartData: chart, listData: list }
  }, [selectedUnit])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Composição da inadimplência</span>
        <h2>Por tipo de serviço · {selectedUnitName}</h2>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.chartBox}>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={82}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid rgba(148, 163, 184, 0.22)",
                  borderRadius: 12,
                  color: "#f8fafc",
                }}
                formatter={(value, _name, item) => [
                  `R$ ${Number(value).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`,
                  `${item.payload.name} (${item.payload.percentage.toFixed(2)}%)`,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.metricList} aria-label="Composição da inadimplência por tipo de serviço">
          {listData.map((item) => (
            <div className={styles.metricRow} key={item.service}>
              <span>{item.service}</span>
              <strong>{Math.round(item.percentage)}%</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
