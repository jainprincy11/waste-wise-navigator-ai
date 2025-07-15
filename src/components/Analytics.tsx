import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Calendar,
  Download,
  Filter,
  Recycle,
  Truck,
  Leaf,
  DollarSign
} from "lucide-react";

const wasteTypeData = [
  { type: 'Mixed', amount: 1245, percentage: 35, color: 'waste-mixed', trend: 12 },
  { type: 'Plastic', amount: 890, percentage: 25, color: 'waste-plastic', trend: -5 },
  { type: 'Organic', amount: 670, percentage: 19, color: 'waste-organic', trend: 8 },
  { type: 'Paper', amount: 520, percentage: 15, color: 'waste-paper', trend: -3 },
  { type: 'Medical', amount: 215, percentage: 6, color: 'waste-medical', trend: 15 }
];

const collectionData = [
  { month: 'Jan', collections: 145, efficiency: 92, cost: 2400 },
  { month: 'Feb', collections: 162, efficiency: 89, cost: 2650 },
  { month: 'Mar', collections: 178, efficiency: 94, cost: 2320 },
  { month: 'Apr', collections: 190, efficiency: 91, cost: 2580 },
  { month: 'May', collections: 203, efficiency: 96, cost: 2200 },
  { month: 'Jun', collections: 218, efficiency: 93, cost: 2450 }
];

const binPerformance = [
  { id: 'BIN001', name: 'Main Plaza', collections: 45, uptime: 98.5, issues: 2 },
  { id: 'BIN002', name: 'Park Avenue', collections: 32, uptime: 99.2, issues: 0 },
  { id: 'BIN003', name: 'Medical Center', collections: 67, uptime: 97.8, issues: 3 },
  { id: 'BIN004', name: 'Office Complex', collections: 38, uptime: 95.1, issues: 5 },
  { id: 'BIN005', name: 'Restaurant District', collections: 89, uptime: 99.7, issues: 1 }
];

export default function Analytics() {
  const totalWaste = wasteTypeData.reduce((sum, item) => sum + item.amount, 0);
  const avgEfficiency = collectionData.reduce((sum, item) => sum + item.efficiency, 0) / collectionData.length;
  const totalCollections = collectionData.reduce((sum, item) => sum + item.collections, 0);
  const costSavings = 2400 - 2200; // Difference between highest and lowest monthly cost

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive waste management insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" />
            Date Range
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="iot-card-primary hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Waste Collected</p>
                <p className="text-3xl font-bold text-primary">{totalWaste.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">kg this month</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-success">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="iot-card-success hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Collection Efficiency</p>
                <p className="text-3xl font-bold text-success">{avgEfficiency.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">average this month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
            <Progress value={avgEfficiency} className="mt-4" />
          </CardContent>
        </Card>

        <Card className="iot-card-warning hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Collections</p>
                <p className="text-3xl font-bold text-warning">{totalCollections}</p>
                <p className="text-xs text-muted-foreground">trips this month</p>
              </div>
              <Truck className="w-8 h-8 text-warning" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-success">+8% efficiency gain</span>
            </div>
          </CardContent>
        </Card>

        <Card className="iot-card hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cost Savings</p>
                <p className="text-3xl font-bold text-success">${costSavings}</p>
                <p className="text-xs text-muted-foreground">this month</p>
              </div>
              <DollarSign className="w-8 h-8 text-success" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-success" />
              <span className="text-sm text-success">Route optimization</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waste Type Distribution */}
        <Card className="iot-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Waste Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {wasteTypeData.map((item) => (
              <div key={item.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded bg-${item.color}`}></div>
                    <span className="font-medium">{item.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{item.amount}kg</span>
                    <Badge variant={item.trend > 0 ? 'default' : 'secondary'} className="gap-1">
                      {item.trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(item.trend)}%
                    </Badge>
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Collection Trends */}
        <Card className="iot-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Monthly Collection Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {collectionData.map((item, index) => (
                <div key={item.month} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium">{item.month}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Collections: {item.collections}</span>
                      <span className="text-sm text-muted-foreground">{item.efficiency}% efficiency</span>
                    </div>
                    <Progress value={(item.collections / 250) * 100} className="h-2" />
                  </div>
                  <div className="text-sm text-muted-foreground">${item.cost}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bin Performance Table */}
      <Card className="iot-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Recycle className="w-5 h-5" />
            Bin Performance Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Bin ID</th>
                  <th className="text-left py-3 px-4 font-medium">Location</th>
                  <th className="text-left py-3 px-4 font-medium">Collections</th>
                  <th className="text-left py-3 px-4 font-medium">Uptime</th>
                  <th className="text-left py-3 px-4 font-medium">Issues</th>
                  <th className="text-left py-3 px-4 font-medium">Performance</th>
                </tr>
              </thead>
              <tbody>
                {binPerformance.map((bin) => (
                  <tr key={bin.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-4 font-mono text-sm">{bin.id}</td>
                    <td className="py-3 px-4">{bin.name}</td>
                    <td className="py-3 px-4">{bin.collections}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${bin.uptime > 98 ? 'bg-success' : bin.uptime > 95 ? 'bg-warning' : 'bg-destructive'}`}></span>
                        {bin.uptime}%
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={bin.issues === 0 ? 'default' : bin.issues < 3 ? 'secondary' : 'destructive'}>
                        {bin.issues} issues
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Progress 
                        value={bin.uptime} 
                        className="w-20 h-2" 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Impact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="iot-card-success hover-lift">
          <CardContent className="p-6 text-center">
            <Leaf className="w-12 h-12 text-success mx-auto mb-4" />
            <p className="text-2xl font-bold text-success">2.4 tons</p>
            <p className="text-sm text-muted-foreground">CO₂ emissions saved</p>
            <p className="text-xs text-success mt-2">+15% vs last month</p>
          </CardContent>
        </Card>

        <Card className="iot-card-primary hover-lift">
          <CardContent className="p-6 text-center">
            <Recycle className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-2xl font-bold text-primary">78%</p>
            <p className="text-sm text-muted-foreground">Recycling rate</p>
            <p className="text-xs text-primary mt-2">Target: 80%</p>
          </CardContent>
        </Card>

        <Card className="iot-card-warning hover-lift">
          <CardContent className="p-6 text-center">
            <Truck className="w-12 h-12 text-warning mx-auto mb-4" />
            <p className="text-2xl font-bold text-warning">156 km</p>
            <p className="text-sm text-muted-foreground">Route distance saved</p>
            <p className="text-xs text-warning mt-2">AI optimization</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}