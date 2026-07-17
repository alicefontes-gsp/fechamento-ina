# Dashboard Fechamento Mensal - Inadimplência Acumulada

Dashboard interativo para visualizar e gerenciar dados de inadimplência mensal.

## 🚀 Features

- 📊 Gráficos interativos (pizzas, barras, linhas)
- 📋 Tabelas dinâmicas com dados
- 📁 Upload de arquivos Excel (.xlsx)
- 📈 Visualização de tendências e métricas
- 🎨 Interface responsiva e moderna

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Gráficos**: Chart.js + react-chartjs-2
- **Excel**: XLSX (xlsx library)
- **Estilização**: CSS Modules

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

Acesse: http://localhost:3000

## 📁 Estrutura do Projeto

```
/app              - Páginas Next.js (App Router)
/components       - Componentes reutilizáveis
/lib              - Utilitários e helpers
/public           - Arquivos estáticos
```

## 📊 Como usar

1. Acesse a página principal
2. Clique em "Upload Excel" ou selecione um arquivo
3. Visualize os gráficos e tabelas automaticamente
4. Interaja com os dados

## 📝 Formato do Excel

Esperado:

| Mês | Devedor | Valor | Categoria | Status |
|-----|---------|-------|-----------|--------|
| Jan | João Silva | 1500 | A Receber | Pendente |
| Jan | Maria Santos | 2000 | A Receber | Pago |

## 📄 Licença

Privado
