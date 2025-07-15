import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Settings, 
  Power, 
  RefreshCw, 
  Truck, 
  Bell, 
  Shield, 
  Zap,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Users,
  Database
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Bin {
  id: string;
  name: string;
  type: string;
  fillLevel: number;
  status: 'normal' | 'moderate' | 'critical';
  isOnline: boolean;
  batteryLevel: number;
}

interface AdminPanelProps {
  bins: Bin[];
  onBinUpdate?: (binId: string, updates: Partial<Bin>) => void;
}

export default function AdminPanel({ bins, onBinUpdate }: AdminPanelProps) {
  const [systemStatus, setSystemStatus] = useState({
    autoEmptyEnabled: true,
    bagReplacementEnabled: true,
    routeOptimization: true,
    alertsEnabled: true,
    emergencyMode: false
  });

  const [thresholds, setThresholds] = useState({
    criticalLevel: [85],
    moderateLevel: [70],
    batteryWarning: [20]
  });

  const [selectedBins, setSelectedBins] = useState<string[]>([]);

  const handleSystemToggle = (setting: keyof typeof systemStatus) => {
    setSystemStatus(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "System Updated",
      description: `${setting.replace(/([A-Z])/g, ' $1').toLowerCase()} has been ${systemStatus[setting] ? 'disabled' : 'enabled'}`,
    });
  };

  const handleBinAction = (action: string, binId?: string) => {
    const binText = binId ? ` for bin ${binId}` : selectedBins.length > 0 ? ` for ${selectedBins.length} selected bins` : '';
    
    toast({
      title: `${action} Initiated`,
      description: `${action}${binText} has been started`,
    });
  };

  const handleBinSelect = (binId: string) => {
    setSelectedBins(prev => 
      prev.includes(binId) 
        ? prev.filter(id => id !== binId)
        : [...prev, binId]
    );
  };

  const onlineCount = bins.filter(bin => bin.isOnline).length;
  const criticalCount = bins.filter(bin => bin.status === 'critical').length;
  const lowBatteryCount = bins.filter(bin => bin.batteryLevel < 20).length;

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="iot-card-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Online Bins</p>
                <p className="text-3xl font-bold text-success">{onlineCount}/{bins.length}</p>
              </div>
              <Zap className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="iot-card-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Alerts</p>
                <p className="text-3xl font-bold text-warning">{criticalCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="iot-card-danger">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Battery</p>
                <p className="text-3xl font-bold text-destructive">{lowBatteryCount}</p>
              </div>
              <Database className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Controls */}
      <Card className="iot-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            System Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Automation Settings */}
            <div className="space-y-4">
              <h3 className="font-semibold">Automation</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto Empty</p>
                    <p className="text-sm text-muted-foreground">Automatically empty critical bins</p>
                  </div>
                  <Switch 
                    checked={systemStatus.autoEmptyEnabled}
                    onCheckedChange={() => handleSystemToggle('autoEmptyEnabled')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Bag Replacement</p>
                    <p className="text-sm text-muted-foreground">Auto replace polythene bags</p>
                  </div>
                  <Switch 
                    checked={systemStatus.bagReplacementEnabled}
                    onCheckedChange={() => handleSystemToggle('bagReplacementEnabled')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Route Optimization</p>
                    <p className="text-sm text-muted-foreground">AI-powered route planning</p>
                  </div>
                  <Switch 
                    checked={systemStatus.routeOptimization}
                    onCheckedChange={() => handleSystemToggle('routeOptimization')}
                  />
                </div>
              </div>
            </div>

            {/* Alert Settings */}
            <div className="space-y-4">
              <h3 className="font-semibold">Alerts & Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Real-time Alerts</p>
                    <p className="text-sm text-muted-foreground">Push notifications enabled</p>
                  </div>
                  <Switch 
                    checked={systemStatus.alertsEnabled}
                    onCheckedChange={() => handleSystemToggle('alertsEnabled')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Emergency Mode</p>
                    <p className="text-sm text-muted-foreground text-destructive">Override all automations</p>
                  </div>
                  <Switch 
                    checked={systemStatus.emergencyMode}
                    onCheckedChange={() => handleSystemToggle('emergencyMode')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Threshold Settings */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="font-semibold">Threshold Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Critical Level (%)</label>
                <Slider
                  value={thresholds.criticalLevel}
                  onValueChange={(value) => setThresholds(prev => ({...prev, criticalLevel: value}))}
                  max={100}
                  min={50}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">{thresholds.criticalLevel[0]}%</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Moderate Level (%)</label>
                <Slider
                  value={thresholds.moderateLevel}
                  onValueChange={(value) => setThresholds(prev => ({...prev, moderateLevel: value}))}
                  max={90}
                  min={30}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">{thresholds.moderateLevel[0]}%</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Battery Warning (%)</label>
                <Slider
                  value={thresholds.batteryWarning}
                  onValueChange={(value) => setThresholds(prev => ({...prev, batteryWarning: value}))}
                  max={50}
                  min={5}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">{thresholds.batteryWarning[0]}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bin Management */}
      <Card className="iot-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Bin Management
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                disabled={selectedBins.length === 0}
                onClick={() => handleBinAction('Bulk Action')}
              >
                Bulk Actions ({selectedBins.length})
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bins.map((bin) => (
              <div key={bin.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedBins.includes(bin.id)}
                    onChange={() => handleBinSelect(bin.id)}
                    className="rounded"
                  />
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${bin.isOnline ? 'bg-success' : 'bg-destructive'}`}></div>
                    <div>
                      <p className="font-medium">{bin.name}</p>
                      <p className="text-sm text-muted-foreground">{bin.id} • {bin.type}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm">Fill: {bin.fillLevel.toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground">Battery: {bin.batteryLevel}%</p>
                  </div>
                  
                  <Badge variant={bin.status === 'critical' ? 'destructive' : bin.status === 'moderate' ? 'secondary' : 'default'}>
                    {bin.status}
                  </Badge>

                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleBinAction('Empty', bin.id)}
                    >
                      <Power className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleBinAction('Restart', bin.id)}
                    >
                      <RefreshCw className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button 
          className="gap-2 h-16" 
          variant="outline"
          onClick={() => handleBinAction('Optimize Routes')}
        >
          <Truck className="w-5 h-5" />
          <span>Optimize Routes</span>
        </Button>
        
        <Button 
          className="gap-2 h-16" 
          variant="outline"
          onClick={() => handleBinAction('Export Data')}
        >
          <Download className="w-5 h-5" />
          <span>Export Data</span>
        </Button>
        
        <Button 
          className="gap-2 h-16" 
          variant="outline"
          onClick={() => handleBinAction('System Backup')}
        >
          <Upload className="w-5 h-5" />
          <span>Backup System</span>
        </Button>
        
        <Button 
          className="gap-2 h-16" 
          variant="outline"
          onClick={() => handleBinAction('Manage Users')}
        >
          <Users className="w-5 h-5" />
          <span>User Management</span>
        </Button>
      </div>
    </div>
  );
}