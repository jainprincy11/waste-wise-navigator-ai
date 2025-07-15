import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Trash2, TrendingUp, Settings } from "lucide-react";

interface Bin {
  id: string;
  name: string;
  type: string;
  fillLevel: number;
  location: { lat: number; lng: number };
  status: 'normal' | 'moderate' | 'critical';
  lastEmptied: string;
}

interface BinMapProps {
  bins: Bin[];
  onBinSelect?: (bin: Bin) => void;
}

export default function BinMap({ bins, onBinSelect }: BinMapProps) {
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const [mapCenter] = useState({ lat: 40.7128, lng: -74.0060 });

  const handleBinClick = (bin: Bin) => {
    setSelectedBin(bin);
    onBinSelect?.(bin);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-destructive';
      case 'moderate': return 'bg-warning';
      default: return 'bg-success';
    }
  };

  const getWasteTypeColor = (type: string) => {
    switch (type) {
      case 'mixed': return 'bg-waste-mixed';
      case 'plastic': return 'bg-waste-plastic';
      case 'organic': return 'bg-waste-organic';
      case 'medical': return 'bg-waste-medical';
      case 'paper': return 'bg-waste-paper';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <Card className="iot-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Interactive Bin Map
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Navigation className="w-4 h-4" />
                Center Map
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                Layers
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Simulated Map View */}
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg h-96 overflow-hidden border border-border/50">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Roads */}
            <div className="absolute inset-0">
              <div className="absolute top-1/3 left-0 right-0 h-2 bg-gray-300 dark:bg-gray-600 opacity-60"></div>
              <div className="absolute top-2/3 left-0 right-0 h-2 bg-gray-300 dark:bg-gray-600 opacity-60"></div>
              <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-gray-300 dark:bg-gray-600 opacity-60"></div>
              <div className="absolute left-3/4 top-0 bottom-0 w-2 bg-gray-300 dark:bg-gray-600 opacity-60"></div>
            </div>

            {/* Bin Markers */}
            {bins.map((bin, index) => {
              const x = 20 + (index % 3) * 30 + Math.random() * 10;
              const y = 20 + Math.floor(index / 3) * 25 + Math.random() * 10;
              
              return (
                <div
                  key={bin.id}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 ${
                    selectedBin?.id === bin.id ? 'scale-125 z-10' : ''
                  }`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => handleBinClick(bin)}
                >
                  {/* Bin Icon */}
                  <div className={`relative w-8 h-8 rounded-full ${getStatusColor(bin.status)} shadow-lg glow-sm`}>
                    <Trash2 className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    
                    {/* Waste Type Indicator */}
                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getWasteTypeColor(bin.type)} border-2 border-white`}></div>
                    
                    {/* Fill Level Ring */}
                    <svg className="absolute -inset-1 w-10 h-10">
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeOpacity="0.2"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${(bin.fillLevel / 100) * 113} 113`}
                        strokeLinecap="round"
                        transform="rotate(-90 20 20)"
                      />
                    </svg>
                  </div>

                  {/* Bin Label */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded shadow-md border text-xs whitespace-nowrap">
                    {bin.name}
                  </div>
                </div>
              );
            })}

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button size="sm" variant="outline" className="w-8 h-8 p-0">+</Button>
              <Button size="sm" variant="outline" className="w-8 h-8 p-0">-</Button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border border-border/50">
              <p className="text-xs font-medium mb-2">Status</p>
              <div className="flex gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span>Normal</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span>Moderate</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span>Critical</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Bin Details */}
      {selectedBin && (
        <Card className="iot-card-primary">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Bin Details - {selectedBin.name}</span>
              <Badge variant={selectedBin.status === 'critical' ? 'destructive' : selectedBin.status === 'moderate' ? 'secondary' : 'default'}>
                {selectedBin.status.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Bin ID</p>
                <p className="font-medium">{selectedBin.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Waste Type</p>
                <p className="font-medium capitalize">{selectedBin.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fill Level</p>
                <p className="font-medium">{selectedBin.fillLevel.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Emptied</p>
                <p className="font-medium">{selectedBin.lastEmptied}</p>
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button className="gap-2" size="sm">
                <TrendingUp className="w-4 h-4" />
                View Analytics
              </Button>
              <Button variant="outline" className="gap-2" size="sm">
                <Navigation className="w-4 h-4" />
                Create Route
              </Button>
              {selectedBin.status === 'critical' && (
                <Button variant="destructive" className="gap-2" size="sm">
                  <Trash2 className="w-4 h-4" />
                  Emergency Empty
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}