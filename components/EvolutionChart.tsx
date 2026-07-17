"use client"

import { useMemo } from "react"
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { dashboardData } from "@/data/dashboardData"
import styles from "./EvolutionChart.module.css"

interface EvolutionChartProps {
  selectedUnit: string
}

function formatPercent(value: number) {
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%`
}

export default function EvolutionChart({ selectedUnit }: EvolutionChartProps) {
  const { chartData, unitName, meta } = useMemo(() => {
    const unit = dashboardData.units.find((item) => item.id === selectedUnit) || dashboardData.units[0]
    const data = dashboardData.monthlyEvolutionByUnit[selectedUnit] || dashboardData.monthlyEvolutionByUnit["great-schools"]
    const metric = dashboardData.unitMetrics[selectedUnit] || dashboardData.unitMetrics["great-schools"]

    return {
      chartData: data,
      unitName: unit.shortName || unit.name,
      meta: metric.metaPercent,
    }
  }, [selectedUnit])

  const maxValue = Math.max(...chartData.map((item) => item.ina), meta, 1)

  return (
    <section className={styles.container} aria-label="Evolução mensal da inadimplência">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Evolução mensal</p>
          <h2>Resultado vs meta 2026 · {unitName}</h2>
        </div>
        <strong className={styles.meta}>Meta: {formatPercent(meta)}</strong>
      </div>

      <div className={styles.chartArea}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 34, right: 10, left: 0, bottom: 4 }} barCategoryGap="32%">
            <defs>
              <linearGradient id="inaBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="48%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={{ stroke: "rgba(148, 163, 184, 0.18)" }}
              tickLine={false}
              tick={{ fill: "#a7b0c3", fontSize: 13, fontWeight: 600 }}
              dy={8}
            />
            <YAxis domain={[0, Math.ceil(maxValue + 2)]} hide />
            <Bar dataKey="ina" radius={[14, 14, 0, 0]} maxBarSize={116}>
              {chartData.map((entry) => (
                <Cell key={entry.month} fill="url(#inaBarGradient)" />
              ))}
              <LabelList
                dataKey="ina"
                position="top"
                offset={8}
                formatter={(value: number) => formatPercent(value)}
                className={styles.barLabel}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
