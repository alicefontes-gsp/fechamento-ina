"use client"

import { dashboardData } from "@/data/dashboardData"
import styles from "./Sidebar.module.css"

interface SidebarProps {
  selectedUnit: string
  onSelectUnit: (unitId: string) => void
}

export default function Sidebar({ selectedUnit, onSelectUnit }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>Unidades</div>
      <nav className={styles.nav}>
        {dashboardData.units.map((unit) => (
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
