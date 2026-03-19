import BarChartComponent from '@/components/charts/BarChart'

export default function AnalyticsPage() {
  const monthlyData = [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 5000 },
    { month: 'Apr', value: 4500 },
    { month: 'May', value: 6000 },
    { month: 'Jun', value: 5500 },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Monthly Data</h2>
        <BarChartComponent data={monthlyData} />
      </div>
    </div>
  )
}