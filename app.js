// ================================
// MOCK DATA - Simulando resposta do backend
// ================================

const mockData = {
    dashboard: {
        currentIntensity: 188,
        unit: "gCO₂eq/kWh",
        alert: {
            type: "high",
            message: "🔴 ALERTA: Pico de emissão previsto para amanhã, das 14:00 às 17:00."
        },
        trend: {
            value: -12,
            label: "Redução esperada"
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
            { time: "22:00", intensity: 158 }
        ]
    },
    
    report: {
        title: "Análise de Emissões de Carbono - Semana 33/2024",
        generatedAt: "14 de Agosto de 2024, 15:30",
        content: `
            <h3>Resumo Executivo</h3>
            <p>O sistema de monitoramento registrou uma redução significativa de <strong>15%</strong> nas emissões de carbono durante a semana analisada, comparado ao período anterior. Esta melhoria está diretamente relacionada ao aumento do uso de fontes renováveis na matriz energética.</p>

            <h3>Principais Descobertas</h3>
            <ul>
                <li><strong>Pico de Emissões</strong>: Identificado às terças e quintas-feiras, entre 14:00-17:00, coincidindo com o horário comercial de alta demanda.</li>
                <li><strong>Oportunidades de Otimização</strong>: O sistema IA detectou 3 janelas de oportunidade para reduzir o consumo em <strong>8%</strong> adicional, migrando cargas não-críticas para períodos de baixa intensidade.</li>
                <li><strong>Previsão Semanal</strong>: Tendência de melhoria contínua esperada para os próximos 7 dias, com potencial de <strong>20%</strong> de redução total.</li>
            </ul>

            <h3>Recomendações Estratégicas</h3>
            <ol>
                <li><strong>Implementação de Smart Scheduling</strong>: Automatizar o deslocamento de cargas flexíveis para horários de menor intensidade de carbono.</li>
                <li><strong>Alertas Proativos</strong>: Configurar notificações 2 horas antes dos picos previstos para permitir ajustes operacionais.</li>
                <li><strong>Métricas de Performance</strong>: Estabelecer KPIs de sustentabilidade com metas mensais de redução.</li>
            </ol>

            <h3>Próximos Passos</h3>
            <p>O algoritmo de machine learning continua aprendendo com os padrões identificados, melhorando a precisão das previsões em <strong>3%</strong> a cada semana. Recomenda-se revisão quinzenal dos parâmetros de otimização.</p>
        `
    },

    settings: {
        emailAlerts: {
            email: ""
        },
        alertLimit: {
            value: 400,
            unit: "gCO₂eq/kWh"
        }
    }
};

// ================================
// GLOBAL VARIABLES
// ================================

let currentTab = 'dashboard';
let intensityChart = null;

// ================================
// NAVIGATION FUNCTIONS
// ================================

function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const tabName = e.currentTarget.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Add active class to clicked nav item
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Show corresponding screen
    document.getElementById(`${tabName}-screen`).classList.add('active');
    
    // Update current tab
    currentTab = tabName;
    
    // Load content based on tab
    switch(tabName) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'reports':
            renderReports();
            break;
        case 'settings':
            renderSettings();
            break;
    }
}

// ================================
// DASHBOARD FUNCTIONS
// ================================

function renderDashboard() {
    const data = mockData.dashboard;
    
    // Update current intensity
    document.getElementById('current-intensity').textContent = data.currentIntensity;
    
    // Update alert message
    document.getElementById('alert-message').textContent = data.alert.message;
    
    // Create or update chart
    createIntensityChart(data.historicalData);
}

function createIntensityChart(data) {
    const ctx = document.getElementById('intensityChart').getContext('2d');
    
    if (intensityChart) {
        intensityChart.destroy();
    }
    
    intensityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(item => item.time),
            datasets: [{
                label: 'Intensidade de Carbono',
                data: data.map(item => item.intensity),
                borderColor: 'hsl(142, 76%, 36%)',
                backgroundColor: 'hsla(142, 76%, 36%, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'hsl(142, 76%, 36%)',
                pointBorderColor: 'hsl(142, 76%, 36%)',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'hsl(220, 15%, 9%)',
                    titleColor: 'hsl(210, 40%, 98%)',
                    bodyColor: 'hsl(210, 40%, 98%)',
                    borderColor: 'hsl(220, 15%, 15%)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} gCO₂eq/kWh`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'hsl(220, 15%, 15%)',
                        drawBorder: false
                    },
                    ticks: {
                        color: 'hsl(215, 20.2%, 65.1%)',
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'hsl(220, 15%, 15%)',
                        drawBorder: false
                    },
                    ticks: {
                        color: 'hsl(215, 20.2%, 65.1%)',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value + ' gCO₂eq/kWh';
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// ================================
// REPORTS FUNCTIONS
// ================================

function renderReports() {
    const data = mockData.report;
    const reportContent = document.getElementById('report-content');
    
    reportContent.innerHTML = data.content;
}

// ================================
// SETTINGS FUNCTIONS
// ================================

function renderSettings() {
    const data = mockData.settings;
    
    // Update form values
    document.getElementById('email').value = data.emailAlerts.email;
    document.getElementById('limit').value = data.alertLimit.value;
    document.getElementById('current-limit').textContent = data.alertLimit.value;
    
    // Add form event listeners
    setupSettingsForms();
}

function setupSettingsForms() {
    // Email form
    const emailForm = document.getElementById('email-form');
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        if (!email || !isValidEmail(email)) {
            showToast('Por favor, insira um e-mail válido.', 'error');
            return;
        }
        
        mockData.settings.emailAlerts.email = email;
        showToast(`E-mail salvo! Notificações serão enviadas para: ${email}`, 'success');
    });
    
    // Limit form
    const limitForm = document.getElementById('limit-form');
    limitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const limit = parseInt(document.getElementById('limit').value);
        
        if (limit < 0) {
            showToast('O limite deve ser um valor positivo.', 'error');
            return;
        }
        
        mockData.settings.alertLimit.value = limit;
        document.getElementById('current-limit').textContent = limit;
        showToast(`Limite atualizado! Alertas serão enviados quando a intensidade ultrapassar ${limit} gCO₂eq/kWh`, 'success');
    });
}

// ================================
// UTILITY FUNCTIONS
// ================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function initializeFeatherIcons() {
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// ================================
// INITIALIZATION
// ================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather icons
    initializeFeatherIcons();
    
    // Initialize navigation
    initializeNavigation();
    
    // Load default dashboard
    renderDashboard();
    
    console.log('🔋 Sentinela Elétrico - Sistema inicializado com sucesso!');
});

// ================================
// RESPONSIVE BEHAVIOR
// ================================

function handleResize() {
    if (intensityChart) {
        intensityChart.resize();
    }
}

window.addEventListener('resize', handleResize);

// ================================
// EXPORT FOR DEBUGGING (opcional)
// ================================

// Expor funções globalmente para debug no console
window.SentinelaEletrico = {
    switchTab,
    renderDashboard,
    renderReports,
    renderSettings,
    mockData,
    showToast
};