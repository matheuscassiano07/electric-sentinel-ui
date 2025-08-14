import { Card } from "@/components/ui/card";
import { AlertTriangle, Zap, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const mockData = {
  currentIntensity: 188,
  unit: "gCO₂eq/kWh",
  alert: {
    type: "high",
    message: "🔴 ALERTA: Pico de emissão previsto para amanhã, das 14:00 às 17:00."
  },
  historicalData: [
    { time: "00:00", intensity: 165 },
    { time: "02:00", intensity: 142 },
    { time: "04:00", intensity: 138 },
    { time: "06:00", intensity: 156 },
    { time: "08:00", intensity: 178 },
    { time: "10:00", intensity: 195 },
    { time: "12:00", intensity: 210 },
    { time: "14:00", intensity: 225 },
    { time: "16:00", intensity: 198 },
    { time: "18:00", intensity: 185 },
    { time: "20:00", intensity: 172 },
    { time: "22:00", intensity: 158 },
  ]
};

export const Dashboard = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carbon Intensity Card */}
        <Card className="lg:col-span-1 p-6 bg-card shadow-card border-border hover:shadow-glow-primary transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center animate-pulse-glow">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Intensidade de Carbono Agora
              </h3>
              <p className="text-sm text-muted-foreground">Tempo real</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {mockData.currentIntensity}
            </div>
            <div className="text-sm text-muted-foreground">
              {mockData.unit}
            </div>
          </div>
        </Card>

        {/* Alert Card */}
        <Card className="lg:col-span-1 p-6 bg-card shadow-card border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Alerta Preditivo
              </h3>
              <p className="text-sm text-muted-foreground">Sistema de IA</p>
            </div>
          </div>
          <div className="text-sm text-card-foreground leading-relaxed">
            {mockData.alert.message}
          </div>
        </Card>

        {/* Trend Card */}
        <Card className="lg:col-span-1 p-6 bg-card shadow-card border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Tendência 24h
              </h3>
              <p className="text-sm text-muted-foreground">Análise preditiva</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">-12%</div>
            <div className="text-sm text-muted-foreground">
              Redução esperada
            </div>
          </div>
        </Card>
      </div>

      {/* Historical Chart */}
      <Card className="p-6 bg-card shadow-card border-border">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-card-foreground mb-2">
            Histórico de Intensidade - Últimas 24h
          </h3>
          <p className="text-sm text-muted-foreground">
            Variação da intensidade de carbono ao longo do dia
          </p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.historicalData}>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(215 20.2% 65.1%)', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(215 20.2% 65.1%)', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(220 15% 9%)',
                  border: '1px solid hsl(220 15% 15%)',
                  borderRadius: '8px',
                  color: 'hsl(210 40% 98%)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="intensity" 
                stroke="hsl(142 76% 36%)" 
                strokeWidth={3}
                dot={{ fill: 'hsl(142 76% 36%)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(142 76% 36%)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};