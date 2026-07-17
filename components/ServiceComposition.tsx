"use client"

import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { dashboardData } from "@/data/dashboardData"
import styles from "./ServiceComposition.module.css"

interface ServiceCompositionProps {
  selectedUnit: string
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#06b6d4"]

export default function ServiceComposition({ selectedUnit }: ServiceCompositionProps) {
  const chartData = useMemo(() => {
    const services = dashboardData.services[selectedUnit] || dashboardData.services["all"]
    return services.map((s) => ({
      name: s.service,
      value: s.amount,
    }))
  }, [selectedUnit])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Composição por Tipo de Serviço</h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#252525",
              border: "1px solid #333333",
              borderRadius: 8,
              color: "#e0e0e0",
            }}
            formatter={(value) =>
              `R$ ${Number(value).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
