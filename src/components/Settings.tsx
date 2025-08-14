import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Mail, AlertTriangle, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Settings = () => {
  const [email, setEmail] = useState("");
  const [alertLimit, setAlertLimit] = useState(400);
  const { toast } = useToast();

  const handleSaveEmail = () => {
    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, insira um e-mail válido.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "E-mail salvo!",
      description: `Notificações serão enviadas para: ${email}`,
    });
  };

  const handleSaveLimit = () => {
    if (alertLimit < 0) {
      toast({
        title: "Erro",
        description: "O limite deve ser um valor positivo.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Limite atualizado!",
      description: `Alertas serão enviados quando a intensidade ultrapassar ${alertLimit} gCO₂eq/kWh`,
    });
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
          <SettingsIcon className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Configurações do Sistema
          </h1>
          <p className="text-muted-foreground">
            Personalize os alertas e notificações do Sentinela Elétrico
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Email Settings Card */}
        <Card className="p-6 bg-card shadow-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Alertas de E-mail
              </h3>
              <p className="text-sm text-muted-foreground">
                Configure seu e-mail para receber notificações
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-card-foreground">
                Endereço de E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
              />
            </div>
            
            <Button 
              onClick={handleSaveEmail}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar E-mail
            </Button>
          </div>
        </Card>

        {/* Alert Limit Settings Card */}
        <Card className="p-6 bg-card shadow-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Limite de Alerta
              </h3>
              <p className="text-sm text-muted-foreground">
                Defina quando receber alertas de alta emissão
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="limit" className="text-card-foreground">
                Limite (gCO₂eq/kWh)
              </Label>
              <Input
                id="limit"
                type="number"
                placeholder="400"
                value={alertLimit}
                onChange={(e) => setAlertLimit(Number(e.target.value))}
                className="mt-2"
                min="0"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Valor atual: {alertLimit} gCO₂eq/kWh
              </p>
            </div>
            
            <Button 
              onClick={handleSaveLimit}
              className="w-full bg-warning hover:bg-warning/90 text-warning-foreground"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Limite
            </Button>
          </div>
        </Card>
      </div>

      {/* Status Card */}
      <Card className="p-6 bg-card shadow-card border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          Status do Sistema
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-card-foreground">Monitoramento Ativo</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-card-foreground">IA Funcionando</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-card-foreground">Dados Atualizados</span>
          </div>
        </div>
      </Card>
    </div>
  );
};