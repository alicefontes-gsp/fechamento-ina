"use client"

import MonthDashboard from "@/components/MonthDashboard"
import { dashboardData } from "@/data/dashboardData"

export default function Home() {
  return <MonthDashboard data={dashboardData} />
}
