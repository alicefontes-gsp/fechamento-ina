"use client"

import { useState } from "react"
import { DashboardData } from "@/types/dashboard"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import MetricsGrid from "@/components/MetricsGrid"
import EvolutionChart from "@/components/EvolutionChart"
import CriticalityRanking from "@/components/CriticalityRanking"
import ServiceComposition from "@/components/ServiceComposition"
import styles from "@/app/page.module.css"

interface MonthDashboardProps {
  data: DashboardData
  showServiceComposition?: boolean
}

export default function MonthDashboard({ data, showServiceComposition = true }: MonthDashboardProps) {
  const [selectedUnit, setSelectedUnit] = useState("great-schools")

  return (
    <div className={styles.container}>
      <Header data={data} />
      <div className={styles.mainContent}>
        <Sidebar data={data} selectedUnit={selectedUnit} onSelectUnit={setSelectedUnit} />
        <main className={styles.dashboard}>
          <MetricsGrid data={data} selectedUnit={selectedUnit} />
          <div className={styles.chartsContainer}>
            <EvolutionChart data={data} selectedUnit={selectedUnit} />
            {showServiceComposition && <ServiceComposition data={data} selectedUnit={selectedUnit} />}
          </div>
          <CriticalityRanking data={data} selectedUnit={selectedUnit} />
        </main>
      </div>
    </div>
  )
}
