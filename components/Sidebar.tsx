"use client"

import { DashboardData } from "@/types/dashboard"
import styles from "./Sidebar.module.css"

interface SidebarProps {
  data: DashboardData
  selectedUnit: string
  onSelectUnit: (unitId: string) => void
}

export default function Sidebar({ data, selectedUnit, onSelectUnit }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>Unidades</div>
      <nav className={styles.nav}>
        {data.units.map((unit) => (
          <button
            key={unit.id}
            className={`${styles.navItem} ${
              selectedUnit === unit.id ? styles.active : ""
            }`}
            onClick={() => onSelectUnit(unit.id)}
          >
            <span className={styles.itemName}>{unit.shortName}</span>
            <span className={styles.itemFullName}>{unit.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
