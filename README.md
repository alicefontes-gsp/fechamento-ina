# Dashboard de Inadimplência - Great Schools

Dashboard profissional para acompanhamento mensal de inadimplência das unidades Great Schools.

## 🎯 Características

- 📊 **Layout Escuro Moderno**: Interface profissional com tema escuro
- 🎛️ **Menu por Unidade**: Navegação fácil entre 13 unidades diferentes
- 📈 **Gráfico de Evolução**: Visualize tendências de inadimplência mensal
- 🥧 **Composição por Serviço**: Análise de distribuição de débitos por tipo de serviço
- 🏆 **Ranking de Criticidade**: Tabela com top devedores e nível de risco
- 💾 **Dados Estruturados**: Arquivo separado para facilitar atualização mensal
- 📱 **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

## 🏢 Unidades Monitoradas

- Great Schools
- Santo Anjo
- CCPA
- CJA
- Marupiara
- OBJ-Conselheiro
- OBJ-Ponta da Praia
- OBJ-Embaré
- OBJ-São Vicente
- OBJ-Guarujá
- OBJ-SJC
- OBJ-Praia Grande

## 🚀 Começando

### Instalação

```bash
# Clone o repositório
git clone https://github.com/alicefontes-gsp/fechamento-ina.git
cd fechamento-ina

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

Acesse http://localhost:3000

### Build para Produção

```bash
npm run build
npm start
```

## 📊 Estrutura de Dados

Os dados estão organizados em `/data/dashboardData.ts` com a seguinte estrutura:

```typescript
{
  month: string          // "Junho"
  year: number          // 2026
  units: Unit[]         // Lista de unidades
  unitMetrics: Record   // Métricas por unidade
  monthlyEvolution: []  // Evolução mês a mês
  services: Record      // Composição por serviço
  debtors: Debtor[]     // Ranking de devedores
}
```

## 🔄 Como Atualizar os Dados

1. Abra `/data/dashboardData.ts`
2. Atualize o `month` e `year`
3. Modifique os valores em `unitMetrics`
4. Adicione novo mês em `monthlyEvolution`
5. Atualize `services` e `debtors`
6. Salve e faça deploy

Exemplo de novo mês:

```typescript
monthlyEvolution: [
  // ... meses anteriores
  { month: "Julho", total: 512000, paid: 340000, pending: 172000 },
]
```

## 🎨 Tema Escuro

O dashboard usa um tema escuro profissional com cores:

- **Primária**: #3b82f6 (Azul)
- **Secundária**: #10b981 (Verde)
- **Alerta**: #f59e0b (Amarelo)
- **Crítico**: #ef4444 (Vermelho)

## 📱 Responsividade

Dashboard otimizado para:
- 📺 Desktop (1920px+)
- 💻 Laptop (1024px - 1920px)
- 📱 Tablet (768px - 1024px)
- 📲 Mobile (320px - 768px)

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Conecte seu GitHub
# Selecione o repositório
# Deploy automático
```

Acesse: https://projeto-ina-site.vercel.app

## 📝 Licença

Privado - Great Schools

## 💬 Suporte

Para dúvidas ou sugestões, entre em contato.

---

**Desenvolvido com ❤️ para Great Schools**
