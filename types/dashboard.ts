export interface Unit {
  id: string
  name: string
  shortName: string
}

export interface MonthlyData {
  month: string
  total: number
  paid: number
  pending: number
}

export interface ServiceData {
  service: string
  amount: number
  percentage: number
}

export interface Debtor {
  id: string
  name: string
  unit: string
  amount: number
  daysOverdue: number
  risk: "critical" | "high" | "medium" | "low"
  service: string
}

export interface DashboardData {
  month: string
  year: number
  units: Unit[]
  unitMetrics: Record<
    string,
    {
      totalDebt: number
      paidAmount: number
      pendingAmount: number
      debtors: number
      averageDebt: number
      riskLevel: "critical" | "high" | "medium" | "low"
    }
  >
  monthlyEvolution: MonthlyData[]
  services: Record<string, ServiceData[]>
  debtors: Debtor[]
}
