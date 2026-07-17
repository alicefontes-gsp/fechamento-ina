'use client'

import { useMemo } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js'
import { Pie, Bar, Line } from 'react-chartjs-2'
import { InadimplenciaData } from '@/lib/excelParser'
import styles from './ChartSection.module.css'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement)

interface ChartSectionProps {
  data: InadimplenciaData[]
}

export default function ChartSection({ data }: ChartSectionProps) {
  const statusChart = useMemo(() => {
    const statusCount = data.reduce(
      (acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + item.valor
        return acc
      },
      {} as Record<string, number>
    )

    return {
      labels: Object.keys(statusCount),
      datasets: [
        {
          label: 'Valor por Status',
          data: Object.values(statusCount),
          backgroundColor: ['#f56565', '#48bb78', '#4299e1', '#ed8936'],
          borderColor: ['#c53030', '#22543d', '#2c5282', '#c05621'],
          borderWidth: 2,
        },
      ],
    }
  }, [data])

  const categoryChart = useMemo(() => {
    const categoryData = data.reduce(
      (acc, item) => {
        acc[item.categoria] = (acc[item.categoria] || 0) + item.valor
        return acc
      },
      {} as Record<string, number>
    )

    return {
      labels: Object.keys(categoryData),
      datasets: [
        {
          label: 'Valor por Categoria',
          data: Object.values(categoryData),
          backgroundColor: '#667eea',
          borderColor: '#5568d3',
          borderWidth: 2,
        },
      ],
    }
  }, [data])

  const monthChart = useMemo(() => {
    const monthData = data.reduce(
      (acc, item) => {
        acc[item.mes] = (acc[item.mes] || 0) + item.valor
        return acc
      },
      {} as Record<string, number>
    )

    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const sortedMonths = Object.keys(monthData).sort((a, b) => {
      const aIndex = months.indexOf(a)
      const bIndex = months.indexOf(b)
      return aIndex - bIndex
    })

    return {
      labels: sortedMonths,
      datasets: [
        {
          label: 'Inadimplência Acumulada',
          data: sortedMonths.map(m => monthData[m]),
          borderColor: '#764ba2',
          backgroundColor: 'rgba(118, 75, 162, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointRadius: 6,
          pointBackgroundColor: '#764ba2',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        },
      ],
    }
  }, [data])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  }

  return (
    <div className={styles.chartsContainer}>
      <div className={styles.chartCard}>
        <h3>Status de Pagamento</h3>
        <Pie data={statusChart} options={chartOptions} />
      </div>

      <div className={styles.chartCard}>
        <h3>Valor por Categoria</h3>
        <Bar data={categoryChart} options={chartOptions} />
      </div>

      <div className={styles.chartCard + ' ' + styles.fullWidth}>
        <h3>Inadimplência Acumulada por Mês</h3>
        <Line data={monthChart} options={chartOptions} />
      </div>
    </div>
  )
}
