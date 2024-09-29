const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment');

// Substitua pelo seu Token do bot
const TOKEN = '7939284232:AAFyyd5ssf-gG7bsIpdLeHLacPFjKtd0aLk';
const CHAT_ID = '-1002353906827';

// Cria um bot que usa 'polling' para receber atualizações
const bot = new TelegramBot(TOKEN, { polling: true });

// Função para enviar sinal de trade
function enviarSinal(sinal, par, duracao) {
    const agora = moment().format('HH:mm');
    const mensagem = `🚀 TRADING RELÂMPAGO 🚀\n\n` +
        `${par} (Até ${duracao}min) -> ${sinal}\n\n` +
        `📊 Entrar ${sinal} em ${agora}\n` +
        `🔄 1ª REENTRADA —> ${incrementarTempo(1)}\n` +
        `🔄 2ª REENTRADA —> ${incrementarTempo(2)}\n\n` +
        `🔔 Clique para abrir a corretora: https://trade.avalonbroker.io/register?aff=425672&aff_model=revenue&afftrack=` +
        `🆘 Guia Do Trader - Te ensino! Clique aqui! (https://pay.kirvano.com/34f6e826-54aa-43ae-946f-42b9d9d492da)`;

    bot.sendMessage(CHAT_ID, mensagem);
}

// Função para incrementar tempo (minutos)
function incrementarTempo(minutos) {
    return moment().add(minutos, 'minutes').format('HH:mm');
}

// Função para agendar os sinais
function agendarSinais(sinais, inicio, intervalo) {
    sinais.forEach((sinal, index) => {
        const tempoParaEnviar = (inicio + index * intervalo) * 60 * 1000; // Converter minutos para milissegundos
        setTimeout(() => {
            enviarSinal(sinal.sinal, sinal.par, sinal.duracao);
        }, tempoParaEnviar);
    });
}

// Exemplo de sinais (15 sinais no total)
const sinais = [
    { sinal: "VENDIDO", par: "Google", duracao: 5 },
    { sinal: "VENDIDO", par: "EUR/USD", duracao: 1 },
    { sinal: "VENDIDO", par: "GBP/JPY", duracao: 3 },
    { sinal: "VENDIDO", par: "AAPL", duracao: 5 },
    { sinal: "VENDIDO", par: "USD/CHF", duracao: 1 },
    { sinal: "VENDIDO", par: "AUD/NZD", duracao: 3 },
    { sinal: "VENDIDO", par: "EUR/JPY", duracao: 5 },
    { sinal: "VENDIDO", par: "USD/JPY", duracao: 1 },
    { sinal: "VENDIDO", par: "GBP/USD", duracao: 3 },
    { sinal: "VENDIDO", par: "CAD/JPY", duracao: 5 },
    { sinal: "VENDIDO", par: "NZD/USD", duracao: 1 },
    { sinal: "VENDIDO", par: "EUR/AUD", duracao: 3 },
    { sinal: "VENDIDO", par: "AUD/CAD", duracao: 5 },
    { sinal: "VENDIDO", par: "USD/CAD", duracao: 1 },
    { sinal: "VENDIDO", par: "GBP/CAD", duracao: 3 },
];

// Agendar sinais para o primeiro período (9:00 - 10:30)
agendarSinais(sinais.slice(0, 5), 0, 18); // 5 sinais em 90 minutos (18 minutos cada)

// Agendar sinais para o segundo período (18:00 - 18:30)
agendarSinais(sinais.slice(5, 10), 540, 6); // 5 sinais em 30 minutos (6 minutos cada)

// Agendar sinais para o terceiro período (22:00 - 22:30)
agendarSinais(sinais.slice(10, 15), 1320, 6); // 5 sinais em 30 minutos (6 minutos cada)
