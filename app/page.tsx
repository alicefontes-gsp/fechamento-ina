"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import MetricsGrid from "@/components/MetricsGrid"
import EvolutionChart from "@/components/EvolutionChart"
import CriticalityRanking from "@/components/CriticalityRanking"
import ServiceComposition from "@/components/ServiceComposition"
import styles from "./page.module.css"

export default function Home() {
  const [selectedUnit, setSelectedUnit] = useState("all")

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContent}>
        <Sidebar selectedUnit={selectedUnit} onSelectUnit={setSelectedUnit} />
        <main className={styles.dashboard}>
          <MetricsGrid selectedUnit={selectedUnit} />
          <div className={styles.chartsContainer}>
            <EvolutionChart selectedUnit={selectedUnit} />
            <ServiceComposition selectedUnit={selectedUnit} />
          </div>
          <CriticalityRanking selectedUnit={selectedUnit} />
        </main>
      </div>
    </div>
  )
}
