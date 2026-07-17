import * as XLSX from 'xlsx'

export interface InadimplenciaData {
  mes: string
  devedor: string
  valor: number
  categoria: string
  status: string
}

export const parseExcelFile = (file: File): Promise<InadimplenciaData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const data = event.target?.result
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json<InadimplenciaData>(sheet)
        
        const validData = jsonData.map(row => ({
          mes: String(row.mes || ''),
          devedor: String(row.devedor || ''),
          valor: typeof row.valor === 'number' ? row.valor : parseFloat(String(row.valor)) || 0,
          categoria: String(row.categoria || ''),
          status: String(row.status || ''),
        }))

        resolve(validData)
      } catch (error) {
        reject(new Error('Erro ao processar Excel: ' + (error instanceof Error ? error.message : 'Desconhecido')))
      }
    }

    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo'))
    }

    reader.readAsArrayBuffer(file)
  })
}

export const calculateMetrics = (data: InadimplenciaData[]) => {
  const totalValue = data.reduce((sum, item) => sum + item.valor, 0)
  const pendingValue = data
    .filter(item => item.status === 'Pendente')
    .reduce((sum, item) => sum + item.valor, 0)
  const paidValue = data
    .filter(item => item.status === 'Pago')
    .reduce((sum, item) => sum + item.valor, 0)

  return {
    totalValue,
    pendingValue,
    paidValue,
    totalRecords: data.length,
    pendingRecords: data.filter(item => item.status === 'Pendente').length,
  }
}
