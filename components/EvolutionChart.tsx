"use client"

import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { dashboardData } from "@/data/dashboardData"
import styles from "./EvolutionChart.module.css"

interface EvolutionChartProps {
  selectedUnit: string
}

export default function EvolutionChart({ selectedUnit }: EvolutionChartProps) {
  const chartData = useMemo(() => dashboardData.monthlyEvolution, [selectedUnit])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Evolução da INA acumulada</h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#263248" />
          <XAxis dataKey="month" stroke="#8b95a8" style={{ fontSize: 12 }} />
          <YAxis
            stroke="#8b95a8"
            style={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid rgba(148, 163, 184, 0.22)",
              borderRadius: 8,
              color: "#f8fafc",
            }}
            formatter={(value) => `${Number(value).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}%`}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="ina"
            stroke="#ef4444"
            name="INA acumulada"
            strokeWidth={2}
            dot={{ fill: "#ef4444", r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="meta"
            stroke="#10b981"
            name="Meta"
            strokeWidth={2}
            dot={{ fill: "#10b981", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
