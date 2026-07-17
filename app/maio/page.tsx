"use client"

import MonthDashboard from "@/components/MonthDashboard"
import { mayDashboardData } from "@/data/mayDashboardData"

export default function MaioPage() {
  return <MonthDashboard data={mayDashboardData} />
}
