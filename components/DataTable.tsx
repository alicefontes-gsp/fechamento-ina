'use client'

import { useState } from 'react'
import { InadimplenciaData } from '@/lib/excelParser'
import styles from './DataTable.module.css'

interface DataTableProps {
  data: InadimplenciaData[]
}

const ITEMS_PER_PAGE = 10

export default function DataTable({ data }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentData = data.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  return (
    <div className={styles.tableSection}>
      <h3>📋 Detalhamento de Registros</h3>
      
      {data.length === 0 ? (
        <p className={styles.emptyMessage}>Nenhum dado para exibir</p>
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Mês</th>
                  <th>Devedor</th>
                  <th>Valor</th>
                  <th>Categoria</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={index} className={item.status === 'Pago' ? styles.rowPaid : styles.rowPending}>
                    <td>{item.mes}</td>
                    <td>{item.devedor}</td>
                    <td className={styles.valor}>
                      R$ {item.valor.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td>{item.categoria}</td>
                    <td>
                      <span className={`${styles.badge} ${item.status === 'Pago' ? styles.badgePaid : styles.badgePending}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                ← Anterior
              </button>
              <span className={styles.pageInfo}>
                Página {currentPage} de {totalPages}
              </span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Próximo →
              </button>
            </div>
          )}

          <div className={styles.summary}>
            <p>Total de registros: <strong>{data.length}</strong></p>
            <p>Mostrando: <strong>{startIndex + 1}</strong> a <strong>{Math.min(endIndex, data.length)}</strong></p>
          </div>
        </>
      )}
    </div>
  )
}
