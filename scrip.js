// script.js - Futuro Sustentável: O Equilíbrio é Possível?

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== SISTEMA DE ABAS COM ANIMAÇÃO ==========
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.tab-pane');

    function switchTab(tabId) {
        // Esconde todos os painéis com transição
        panes.forEach(pane => {
            pane.classList.remove('active-pane');
            pane.style.opacity = '0';
            pane.style.transform = 'translateY(20px)';
        });
        
        // Mostra o painel alvo após um pequeno delay para efeito
        setTimeout(() => {
            panes.forEach(pane => {
                if(pane.id === tabId) {
                    pane.classList.add('active-pane');
                    pane.style.opacity = '1';
                    pane.style.transform = 'translateY(0)';
                }
            });
        }, 50);

        // Atualizar botões ativos
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if(btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            }
        });
    }

    // Adiciona evento de clique para cada botão de aba
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // ========== GRÁFICO DE AUMENTO DE TEMPERATURA ==========
    const ctx = document.getElementById('tempChart').getContext('2d');
    
    // Cores da bandeira do Brasil
    const verde = '#1c6e4f';
    const amarelo = '#f3c74d';
    const azul = '#1e4185';
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Pré-industrial', '1980', '2000', '2015', '2024', '2030 (projeção)'],
            datasets: [{
                label: 'Aumento da temperatura média global (°C)',
                data: [0, 0.3, 0.7, 1.0, 1.2, 1.5],
                borderColor: azul,
                backgroundColor: 'rgba(30, 65, 133, 0.1)',
                borderWidth: 5,
                pointBackgroundColor: amarelo,
                pointBorderColor: verde,
                pointRadius: 7,
                pointHoverRadius: 12,
                pointHoverBackgroundColor: verde,
                pointHoverBorderColor: amarelo,
                tension: 0.2,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    labels: { 
                        font: { size: 14, weight: 'bold' }, 
                        color: '#1e3a2f' 
                    }
                },
                tooltip: {
                    backgroundColor: verde,
                    titleColor: amarelo,
                    bodyColor: 'white',
                    borderColor: amarelo,
                    borderWidth: 2
                }
            },
            scales: {
                y: { 
                    beginAtZero: true, 
                    title: { 
                        display: true, 
                        text: '°C (anomalia)', 
                        color: verde, 
                        font: { weight: 'bold', size: 14 } 
                    },
                    grid: {
                        color: 'rgba(30, 65, 133, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            hover: { 
                mode: 'index', 
                intersect: false 
            }
        }
    });

    // ========== INTERAÇÃO DA PERGUNTA (MOUSE) ==========
    const perguntaBtn = document.getElementById('perguntaBtn');
    const respostaDiv = document.getElementById('respostaSurpresa');
    
    if (perguntaBtn && respostaDiv) {
        // Ao passar o mouse sobre o botão
        perguntaBtn.addEventListener('mouseenter', () => {
            respostaDiv.style.display = 'block';
            respostaDiv.style.opacity = '0';
            respostaDiv.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                respostaDiv.style.transition = 'all 0.25s ease';
                respostaDiv.style.opacity = '1';
                respostaDiv.style.transform = 'scale(1)';
            }, 20);
        });
        
        // Ao retirar o mouse do botão
        perguntaBtn.addEventListener('mouseleave', () => {
            respostaDiv.style.opacity = '0';
            respostaDiv.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                respostaDiv.style.display = 'none';
            }, 250);
        });
        
        // Ao clicar no botão (alternativa)
        perguntaBtn.addEventListener('click', () => {
            respostaDiv.style.display = 'block';
            respostaDiv.style.opacity = '1';
            respostaDiv.style.transform = 'scale(1)';
            
            // Adiciona um efeito de pulse no botão
            perguntaBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                perguntaBtn.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // ========== EFEITOS ADICIONAIS ==========
    
    // Efeito de destaque nos cards ao passar o mouse
    const imgCards = document.querySelectorAll('.img-card');
    imgCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s ease';
        });
    });
    
    // Animação suave de entrada para os fatos
    const fatoItems = document.querySelectorAll('.fato-item');
    fatoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 * index);
    });
    
    // Efeito de rotação no ícone da aba ativa
    const activeTabIcon = document.querySelector('.tab-btn.active i');
    if (activeTabIcon) {
        activeTabIcon.style.transition = 'transform 0.3s';
    }

    // ========== ATUALIZAÇÃO DO GRÁFICO AO REDIMENSIONAR ==========
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Força o redesenho do gráfico (opcional)
            if (window.tempChart) {
                window.tempChart.update();
            }
        }, 250);
    });

    // Salva referência do gráfico para uso posterior
    window.tempChart = Chart.getChart('tempChart');
});