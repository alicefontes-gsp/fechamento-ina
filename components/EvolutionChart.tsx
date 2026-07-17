"use client"

import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { dashboardData } from "@/data/dashboardData"
import styles from "./EvolutionChart.module.css"

interface EvolutionChartProps {
  selectedUnit: string
}

export default function EvolutionChart({ selectedUnit }: EvolutionChartProps) {
  const chartData = useMemo(() => {
    return dashboardData.monthlyEvolution
  }, [selectedUnit])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Evolução Mensal de Inadimplência</h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
          <XAxis dataKey="month" stroke="#808080" style={{ fontSize: 12 }} />
          <YAxis stroke="#808080" style={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#252525",
              border: "1px solid #333333",
              borderRadius: 8,
              color: "#e0e0e0",
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#3b82f6"
            name="Débito Total"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="paid"
            stroke="#10b981"
            name="Valor Pago"
            strokeWidth={2}
            dot={{ fill: "#10b981", r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="pending"
            stroke="#ef4444"
            name="Pendente"
            strokeWidth={2}
            dot={{ fill: "#ef4444", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
