import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import LineChartComponent from '@/components/charts/LineChart'
import { fetchMetrics } from '@/lib/data'

export default async function OverviewPage() {
  const metrics = await fetchMetrics()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics.totalUsers.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${metrics.revenue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics.activeSessions.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Trends</h2>
        <LineChartComponent data={metrics.trendData} />
      </div>
    </div>
  )
}