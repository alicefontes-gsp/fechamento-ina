'use client'

import { useState } from 'react'
import { InadimplenciaData, calculateMetrics } from '@/lib/excelParser'
import ChartSection from './ChartSection'
import DataTable from './DataTable'
import MetricsCard from './MetricsCard'
import styles from './Dashboard.module.css'

interface DashboardProps {
  data: InadimplenciaData[]
}

export default function Dashboard({ data }: DashboardProps) {
  const [filteredData, setFilteredData] = useState<InadimplenciaData[]>(data)
  const [statusFilter, setStatusFilter] = useState<string>('Todos')

  const handleFilterChange = (status: string) => {
    setStatusFilter(status)
    if (status === 'Todos') {
      setFilteredData(data)
    } else {
      setFilteredData(data.filter(item => item.status === status))
    }
  }

  const metrics = calculateMetrics(filteredData)

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>📊 Dashboard de Inadimplência</h1>
        <p>Análise de Fechamento Mensal</p>
      </header>

      <div className={styles.metricsGrid}>
        <MetricsCard
          title="Total em Aberto"
          value={`R$ ${metrics.pendingValue.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          color="#f56565"
        />
        <MetricsCard
          title="Total Pago"
          value={`R$ ${metrics.paidValue.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          color="#48bb78"
        />
        <MetricsCard
          title="Valor Total"
          value={`R$ ${metrics.totalValue.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          color="#4299e1"
        />
        <MetricsCard
          title="Total de Registros"
          value={metrics.totalRecords.toString()}
          color="#ed8936"
        />
      </div>

      <div className={styles.filterSection}>
        <label htmlFor="status-filter">Filtrar por Status:</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
          className={styles.select}
        >
          <option>Todos</option>
          <option>Pendente</option>
          <option>Pago</option>
        </select>
      </div>

      <ChartSection data={filteredData} />

      <DataTable data={filteredData} />
    </div>
  )
}
