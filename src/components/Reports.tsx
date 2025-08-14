import { Card } from "@/components/ui/card";
import { FileText, Bot, Calendar } from "lucide-react";

const mockReport = {
  title: "Análise de Emissões de Carbono - Semana 33/2024",
  generatedAt: "14 de Agosto de 2024, 15:30",
  content: `
**Resumo Executivo**

O sistema de monitoramento registrou uma redução significativa de **15%** nas emissões de carbono durante a semana analisada, comparado ao período anterior. Esta melhoria está diretamente relacionada ao aumento do uso de fontes renováveis na matriz energética.

**Principais Descobertas**

• **Pico de Emissões**: Identificado às terças e quintas-feiras, entre 14:00-17:00, coincidindo com o horário comercial de alta demanda.

• **Oportunidades de Otimização**: O sistema IA detectou 3 janelas de oportunidade para reduzir o consumo em **8%** adicional, migrando cargas não-críticas para períodos de baixa intensidade.

• **Previsão Semanal**: Tendência de melhoria contínua esperada para os próximos 7 dias, com potencial de **20%** de redução total.

**Recomendações Estratégicas**

1. **Implementação de Smart Scheduling**: Automatizar o deslocamento de cargas flexíveis para horários de menor intensidade de carbono.

2. **Alertas Proativos**: Configurar notificações 2 horas antes dos picos previstos para permitir ajustes operacionais.

3. **Métricas de Performance**: Estabelecer KPIs de sustentabilidade com metas mensais de redução.

**Próximos Passos**

O algoritmo de machine learning continua aprendendo com os padrões identificados, melhorando a precisão das previsões em **3%** a cada semana. Recomenda-se revisão quinzenal dos parâmetros de otimização.
  `.trim()
};

export const Reports = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Bot className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Relatórios Gerados por IA
          </h1>
          <p className="text-muted-foreground">
            Análises automáticas e insights inteligentes sobre emissões de carbono
          </p>
        </div>
      </div>

      {/* Report Card */}
      <Card className="p-8 bg-card shadow-card border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-card-foreground">
              {mockReport.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {mockReport.generatedAt}
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="text-card-foreground leading-relaxed space-y-6">
            {mockReport.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={index} className="text-lg font-semibold text-primary mt-8 mb-4">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              
              if (paragraph.includes('•')) {
                const items = paragraph.split('• ').filter(item => item.trim());
                return (
                  <ul key={index} className="space-y-3 ml-4">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span dangerouslySetInnerHTML={{ 
                          __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>') 
                        }} />
                      </li>
                    ))}
                  </ul>
                );
              }

              if (paragraph.match(/^\d+\./)) {
                const items = paragraph.split(/\d+\./).filter(item => item.trim());
                return (
                  <ol key={index} className="space-y-3 ml-4">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {itemIndex + 1}
                        </div>
                        <span dangerouslySetInnerHTML={{ 
                          __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>') 
                        }} />
                      </li>
                    ))}
                  </ol>
                );
              }
              
              return (
                <p key={index} dangerouslySetInnerHTML={{ 
                  __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>') 
                }} />
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};