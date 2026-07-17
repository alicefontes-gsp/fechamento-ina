'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { parseExcelFile, InadimplenciaData } from '@/lib/excelParser'
import styles from './FileUpload.module.css'

interface FileUploadProps {
  onDataLoaded: (data: InadimplenciaData[]) => void
}

export default function FileUpload({ onDataLoaded }: FileUploadProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setError(null)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const fileInput = event.currentTarget.querySelector('input[type="file"]') as HTMLInputElement
    const file = fileInput?.files?.[0]

    if (!file) {
      setError('Por favor, selecione um arquivo')
      return
    }

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setError('Por favor, selecione um arquivo Excel (.xlsx ou .xls)')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await parseExcelFile(file)
      if (data.length === 0) {
        setError('O arquivo está vazio ou não contém dados válidos')
        return
      }
      onDataLoaded(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar arquivo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.uploadForm}>
      <div className={styles.inputGroup}>
        <label htmlFor="file-input" className={styles.label}>
          📁 Selecione um arquivo Excel:
        </label>
        <input
          id="file-input"
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          disabled={loading}
        />
        {fileName && <p className={styles.fileName}>✓ {fileName}</p>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? '⏳ Carregando...' : '📤 Carregar Dados'}
      </button>

      {error && <div className={styles.error}>{error}</div>}
    </form>
  )
}
