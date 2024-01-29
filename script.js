const whatsApp = document.querySelector('.WhatsApp');
const caixaAberto = document.querySelector('input.caixa-aberto');
const caixaFechado = document.querySelector('input.caixa-fechado');
const nome = document.querySelector('.print_zap > h3');
const nomeValor = document.querySelector('.nome');
const on = document.querySelector('.on');
const off = document.querySelector('.off');
const pix = document.querySelector('.pix');
const credito = document.querySelector('.credito');
const debito = document.querySelector('.debito');
const dinheiro = document.querySelector('.dinheiro');
const recPix = document.querySelector('.receb:nth-last-child(5) > div > span:nth-last-child(1)');
const recCredito = document.querySelector('.receb:nth-last-child(4) > div > span:nth-last-child(1)');
const recDebito = document.querySelector('.receb:nth-last-child(3) > div > span:nth-last-child(1)');
const recDinheiro = document.querySelector('.receb:nth-last-child(2) > div > span:nth-last-child(1)');
const total = document.querySelector('.total > span:nth-last-child(1)');

whatsApp.addEventListener('click', () => {
    const dataOnRecebida = caixaAberto.value;
    const dataFechamento = caixaFechado.value ? caixaFechado.value : adicionarDias(dataOnRecebida, 6);
    const dataFormatadaOn = data(dataOnRecebida);
    const dataFormatadaOff = data(dataFechamento);

    nome.textContent = nomeValor.value

    on.textContent = dataFormatadaOn;
    off.textContent = dataFormatadaOff;

    recPix.textContent = formatarNumero(Number(pix.value));
    recCredito.textContent = formatarNumero(Number(credito.value));
    recDebito.textContent = formatarNumero(Number(debito.value));
    recDinheiro.textContent = formatarNumero(Number(dinheiro.value));

    const totalValue = Number(pix.value) + Number(credito.value) + Number(debito.value) + Number(dinheiro.value);
    total.textContent = formatarNumero(totalValue);


    const mensagemWhatsApp = construirMensagemWhatsApp();
    const linkWhatsApp = `https://wa.me/+5569981185283/?text=${encodeURIComponent(mensagemWhatsApp)}`;
    window.open(linkWhatsApp, '_blank');

    const printZap = document.querySelector('.print_zap');

    // Use html2canvas para criar uma imagem da .print_zap
    html2canvas(printZap).then(canvas => {
        // Obtenha o URL da imagem a partir do canvas
        const imgURL = canvas.toDataURL('image/png');

        // Crie um link para a imagem
        const link = document.createElement('a');
        link.href = imgURL;
        link.download = 'relatorio_fechamento_caixa.png';

        // Anexe o link ao corpo e clique nele para iniciar o download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // // Substitua o link abaixo pelo link do WhatsApp com a imagem
        // const linkWhatsApp = `https://wa.me/+5569981185283/?text=${encodeURIComponent('Confira o relatório de fechamento de caixa: ')}`;

        // // Abre uma nova janela ou aba com o link do WhatsApp
        // window.open(linkWhatsApp, '_blank');
    });
});

function data(dtaOn) {
    const dataRecebida = dtaOn.split('-');
    const dataFormatada =  dataRecebida[2] + '/' + dataRecebida[1] + '/' + dataRecebida[0];
    return dataFormatada;
}

function formatarNumero(valor) {
    const partes = valor.toFixed(2).split('.');
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return partes.join(',');
}

function adicionarDias(data, dias) {
    const dataAtual = new Date(data);
    dataAtual.setDate(dataAtual.getDate() + dias);
    const ano = dataAtual.getFullYear();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

function construirMensagemWhatsApp() {
    const dataAbertura = on.textContent;
    const dataFechamento = off.textContent;
    const recPixValue = recPix.textContent;
    const recCreditoValue = recCredito.textContent;
    const recDebitoValue = recDebito.textContent;
    const recDinheiroValue = recDinheiro.textContent;
    const totalValue = total.textContent;

    // Construa a mensagem formatada conforme necessário
    const mensagem = `
        RELATÓRIO DE FECHAMENTO DE CAIXA

        Período: ${dataAbertura} a ${dataFechamento}

        Recebimentos:
        - Pix: R$ ${recPixValue}
        - Crédito: R$ ${recCreditoValue}
        - Débito: R$ ${recDebitoValue}
        - Dinheiro: R$ ${recDinheiroValue}

        *Total: R$ ${totalValue}*
    `;

    return mensagem;
}
