'use client'

import { useState } from 'react'
import FileUpload from '@/components/FileUpload'
import Dashboard from '@/components/Dashboard'
import { InadimplenciaData } from '@/lib/excelParser'
import styles from './page.module.css'

export default function Home() {
  const [data, setData] = useState<InadimplenciaData[] | null>(null)

  const handleDataLoaded = (loadedData: InadimplenciaData[]) => {
    setData(loadedData)
  }

  const handleReset = () => {
    setData(null)
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {!data ? (
          <>
            <div className={styles.hero}>
              <h1>📊 Dashboard de Inadimplência</h1>
              <p>Fechamento Mensal - Análise de Dados</p>
            </div>
            
            <div className={styles.welcome}>
              <h2>Bem-vindo! 👋</h2>
              <p>Carregue um arquivo Excel para começar a visualizar seus dados de inadimplência.</p>
              <p className={styles.hint}>
                💡 O arquivo deve conter as colunas: <strong>Mês, Devedor, Valor, Categoria, Status</strong>
              </p>
            </div>

            <FileUpload onDataLoaded={handleDataLoaded} />
          </>
        ) : (
          <>
            <Dashboard data={data} />
            <button onClick={handleReset} className={styles.resetButton}>
              ↺ Carregar outro arquivo
            </button>
          </>
        )}
      </div>
    </main>
  )
}
