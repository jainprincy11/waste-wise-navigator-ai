import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/Dashboard";
import BinMap from "@/components/BinMap";
import AdminPanel from "@/components/AdminPanel";
import Analytics from "@/components/Analytics";
import { 
  LayoutDashboard, 
  Map, 
  Settings, 
  BarChart3,
  Trash2
} from "lucide-react";

// Mock data for smart bins
const mockBins = [
  { 
    id: 'BIN001', 
    name: 'Main Plaza', 
    type: 'mixed', 
    fillLevel: 85, 
    location: { lat: 40.7128, lng: -74.0060 }, 
    status: 'critical' as const, 
    lastEmptied: '2 days ago',
    isOnline: true,
    batteryLevel: 78
  },
  { 
    id: 'BIN002', 
    name: 'Park Avenue', 
    type: 'plastic', 
    fillLevel: 45, 
    location: { lat: 40.7589, lng: -73.9851 }, 
    status: 'normal' as const, 
    lastEmptied: '1 day ago',
    isOnline: true,
    batteryLevel: 92
  },
  { 
    id: 'BIN003', 
    name: 'Medical Center', 
    type: 'medical', 
    fillLevel: 78, 
    location: { lat: 40.7505, lng: -73.9934 }, 
    status: 'moderate' as const, 
    lastEmptied: '3 hours ago',
    isOnline: true,
    batteryLevel: 56
  },
  { 
    id: 'BIN004', 
    name: 'Office Complex', 
    type: 'paper', 
    fillLevel: 92, 
    location: { lat: 40.7614, lng: -73.9776 }, 
    status: 'critical' as const, 
    lastEmptied: '4 days ago',
    isOnline: false,
    batteryLevel: 12
  },
  { 
    id: 'BIN005', 
    name: 'Restaurant District', 
    type: 'organic', 
    fillLevel: 67, 
    location: { lat: 40.7549, lng: -73.9840 }, 
    status: 'moderate' as const, 
    lastEmptied: '12 hours ago',
    isOnline: true,
    batteryLevel: 89
  },
  { 
    id: 'BIN006', 
    name: 'Shopping Mall', 
    type: 'mixed', 
    fillLevel: 23, 
    location: { lat: 40.7282, lng: -73.7949 }, 
    status: 'normal' as const, 
    lastEmptied: '6 hours ago',
    isOnline: true,
    batteryLevel: 94
  },
];

const Index = () => {
  const [bins, setBins] = useState(mockBins);

  const handleBinUpdate = (binId: string, updates: any) => {
    setBins(prev => prev.map(bin => 
      bin.id === binId ? { ...bin, ...updates } : bin
    ));
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto p-4">
        {/* App Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/10 backdrop-blur-sm">
              <Trash2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold gradient-text">Smart Bin IoT</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Intelligent Waste Management System with AI-Powered Analytics and Real-time Monitoring
          </p>
        </div>

        {/* Main Tabs Navigation */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 mx-auto">
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="gap-2">
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Map View</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <BinMap bins={bins} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Analytics />
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <AdminPanel bins={bins} onBinUpdate={handleBinUpdate} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
