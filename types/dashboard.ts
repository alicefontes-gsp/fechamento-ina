export interface Unit {
  id: string
  name: string
  shortName: string
}

export interface MonthlyData {
  month: string
  ina: number
  meta?: number
}

export interface ServiceData {
  service: string
  amount: number
  percentage: number
}

export interface UnitMetric {
  faturamento: number
  inadimplencia: number
  inaPercent: number
  metaPercent: number
  distancePp: number
  distanceAmount: number
  rfCount: number
  mainService: string
  riskLevel: "critical" | "high" | "medium" | "low"
}

export interface CriticalityItem {
  id: string
  unit: string
  inaPercent: number
  metaPercent: number
  distancePp: number
  distanceAmount: number
  inadimplencia: number
  risk: "critical" | "high" | "medium" | "low"
  mainService: string
}

export interface DashboardData {
  month: string
  year: number
  cutoffDate: string
  updateDate: string
  units: Unit[]
  unitMetrics: Record<string, UnitMetric>
  monthlyEvolution: MonthlyData[]
  monthlyEvolutionByUnit: Record<string, MonthlyData[]>
  services: Record<string, ServiceData[]>
  criticality: CriticalityItem[]
}
