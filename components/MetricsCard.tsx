import styles from './MetricsCard.module.css'

interface MetricsCardProps {
  title: string
  value: string
  color: string
}

export default function MetricsCard({ title, value, color }: MetricsCardProps) {
  return (
    <div className={styles.card} style={{ borderLeftColor: color }}>
      <h4>{title}</h4>
      <p className={styles.value} style={{ color }}>
        {value}
      </p>
    </div>
  )
}
