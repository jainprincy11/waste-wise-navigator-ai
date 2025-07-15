import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Trash2, 
  MapPin, 
  TrendingUp, 
  Bell, 
  Settings, 
  Recycle,
  AlertTriangle,
  CheckCircle,
  Activity,
  Truck,
  BarChart3,
  Users
} from "lucide-react";

// Mock data for smart bins
const generateBins = () => [
  { id: 'BIN001', name: 'Main Plaza', type: 'mixed', fillLevel: 85, location: { lat: 40.7128, lng: -74.0060 }, status: 'critical', lastEmptied: '2 days ago' },
  { id: 'BIN002', name: 'Park Avenue', type: 'plastic', fillLevel: 45, location: { lat: 40.7589, lng: -73.9851 }, status: 'normal', lastEmptied: '1 day ago' },
  { id: 'BIN003', name: 'Medical Center', type: 'medical', fillLevel: 78, location: { lat: 40.7505, lng: -73.9934 }, status: 'moderate', lastEmptied: '3 hours ago' },
  { id: 'BIN004', name: 'Office Complex', type: 'paper', fillLevel: 92, location: { lat: 40.7614, lng: -73.9776 }, status: 'critical', lastEmptied: '4 days ago' },
  { id: 'BIN005', name: 'Restaurant District', type: 'organic', fillLevel: 67, location: { lat: 40.7549, lng: -73.9840 }, status: 'moderate', lastEmptied: '12 hours ago' },
  { id: 'BIN006', name: 'Shopping Mall', type: 'mixed', fillLevel: 23, location: { lat: 40.7282, lng: -73.7949 }, status: 'normal', lastEmptied: '6 hours ago' },
];

const wasteTypeColors = {
  mixed: 'waste-mixed',
  plastic: 'waste-plastic', 
  organic: 'waste-organic',
  medical: 'waste-medical',
  paper: 'waste-paper'
};

const statusColors = {
  normal: 'success',
  moderate: 'warning', 
  critical: 'destructive'
};

export default function Dashboard() {
  const [bins, setBins] = useState(generateBins());
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'critical', message: 'Bin BIN001 at Main Plaza is 85% full', time: '5 min ago' },
    { id: 2, type: 'warning', message: 'Polythene stock running low (23 units remaining)', time: '15 min ago' },
    { id: 3, type: 'success', message: 'Route optimization completed - 15% fuel savings', time: '1 hour ago' },
    { id: 4, type: 'info', message: 'Bin BIN004 door opened automatically', time: '2 hours ago' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBins(prevBins => 
        prevBins.map(bin => ({
          ...bin,
          fillLevel: Math.min(100, bin.fillLevel + Math.random() * 2 - 0.5),
          status: bin.fillLevel > 90 ? 'critical' : bin.fillLevel > 70 ? 'moderate' : 'normal'
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const criticalBins = bins.filter(bin => bin.status === 'critical').length;
  const moderateBins = bins.filter(bin => bin.status === 'moderate').length;
  const normalBins = bins.filter(bin => bin.status === 'normal').length;
  const averageFillLevel = bins.reduce((sum, bin) => sum + bin.fillLevel, 0) / bins.length;

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Smart Bin IoT</h1>
          <p className="text-muted-foreground mt-1">Intelligent Waste Management System</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-2">
            <Activity className="w-3 h-3" />
            Live Monitoring
          </Badge>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="iot-card-primary hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bins</p>
                <p className="text-3xl font-bold text-primary">{bins.length}</p>
              </div>
              <Trash2 className="w-8 h-8 text-primary" />
            </div>
            <div className="mt-4 flex gap-2">
              <Badge variant="secondary" className="text-xs">
                <span className="status-dot status-critical mr-1"></span>
                {criticalBins} Critical
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <span className="status-dot status-moderate mr-1"></span>
                {moderateBins} Moderate
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="iot-card-success hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Fill Level</p>
                <p className="text-3xl font-bold text-success">{averageFillLevel.toFixed(1)}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-success" />
            </div>
            <Progress value={averageFillLevel} className="mt-4" />
          </CardContent>
        </Card>

        <Card className="iot-card-warning hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Routes</p>
                <p className="text-3xl font-bold text-warning">3</p>
              </div>
              <Truck className="w-8 h-8 text-warning" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">2 trucks active, 1 optimizing</p>
          </CardContent>
        </Card>

        <Card className="iot-card hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">CO₂ Saved</p>
                <p className="text-3xl font-bold text-success">2.4t</p>
              </div>
              <Recycle className="w-8 h-8 text-success" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">+12% vs last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Smart Bins List */}
        <div className="lg:col-span-2">
          <Card className="iot-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Smart Bins Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bins.map((bin) => (
                <div key={bin.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full bg-${wasteTypeColors[bin.type as keyof typeof wasteTypeColors]}`}></div>
                    <div>
                      <p className="font-medium">{bin.name}</p>
                      <p className="text-sm text-muted-foreground">ID: {bin.id} • {bin.type.charAt(0).toUpperCase() + bin.type.slice(1)} waste</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{bin.fillLevel.toFixed(1)}%</p>
                      <p className="text-xs text-muted-foreground">Last: {bin.lastEmptied}</p>
                    </div>
                    <Badge variant={bin.status === 'critical' ? 'destructive' : bin.status === 'moderate' ? 'secondary' : 'default'}>
                      {bin.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Notifications & Quick Actions */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card className="iot-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="flex-shrink-0 mt-1">
                    {notification.type === 'critical' && <AlertTriangle className="w-4 h-4 text-destructive" />}
                    {notification.type === 'warning' && <AlertTriangle className="w-4 h-4 text-warning" />}
                    {notification.type === 'success' && <CheckCircle className="w-4 h-4 text-success" />}
                    {notification.type === 'info' && <Activity className="w-4 h-4 text-info" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="iot-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-2" variant="outline">
                <Truck className="w-4 h-4" />
                Optimize Routes
              </Button>
              <Button className="w-full justify-start gap-2" variant="outline">
                <Users className="w-4 h-4" />
                Dispatch Team
              </Button>
              <Button className="w-full justify-start gap-2" variant="outline">
                <TrendingUp className="w-4 h-4" />
                View Analytics
              </Button>
              <Button className="w-full justify-start gap-2" variant="outline">
                <Settings className="w-4 h-4" />
                System Control
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}