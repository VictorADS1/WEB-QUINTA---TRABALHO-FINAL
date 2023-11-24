function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calcularPrecoOperadoraA(idade, imc) {
    const planoBasico = 100 + (idade * 10 * (imc / 10));
    const planoStandard = (150 + (idade * 15)) * (imc / 10);
    const planoPremium = (200 - (imc * 10) + (idade * 20)) * (imc / 10);

    return [planoBasico, planoStandard, planoPremium].map(formatarMoeda);
}

function calcularPrecoOperadoraB(idade, imc) {
    let fatorComorbidade = 0;

    if (imc < 18.5) {
        fatorComorbidade = 10;
    } else if (18.5 <= imc && imc < 24.9) {
        fatorComorbidade = 1;
    } else if (25 <= imc && imc < 29.9) {
        fatorComorbidade = 6;
    } else if (30 <= imc && imc < 34.9) {
        fatorComorbidade = 10;
    } else if (35 <= imc && imc < 39.9) {
        fatorComorbidade = 20;
    } else if (imc >= 40) {
        fatorComorbidade = 30;
    }

    const planoBasico = 100 + (fatorComorbidade * 10 * (imc / 10));
    const planoStandard = (150 + (fatorComorbidade * 15)) * (imc / 10);
    const planoPremium = (200 - (imc * 10) + (fatorComorbidade * 20)) * (imc / 10);

    return [planoBasico, planoStandard, planoPremium].map(formatarMoeda);
}

function calcularPlanos() {
    const idade = parseInt(document.getElementById('idade').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);

    const imc = peso / (altura * altura);

    const resultadosA = calcularPrecoOperadoraA(idade, imc);
    const resultadosB = calcularPrecoOperadoraB(idade, imc);

    const tabelaResultados = document.getElementById('tabelaResultados');
    tabelaResultados.innerHTML = '';

    const extrato = document.getElementById('extrato');
    extrato.innerHTML = `
       
    `;

    const planos = ['Básico', 'Standard', 'Premium'];

    for (let i = 0; i < planos.length; i++) {
        const linha = document.createElement('tr');
        const colunaPlano = document.createElement('td');
        const colunaOperadoraA = document.createElement('td');
        const colunaOperadoraB = document.createElement('td');

        colunaPlano.textContent = planos[i];
        colunaOperadoraA.textContent = resultadosA[i];
        colunaOperadoraB.textContent = resultadosB[i];

        linha.appendChild(colunaPlano);
        linha.appendChild(colunaOperadoraA);
        linha.appendChild(colunaOperadoraB);

        tabelaResultados.appendChild(linha);
    }
}