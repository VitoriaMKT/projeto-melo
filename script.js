const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPage || (href === 'index.html' && currentPage === '')) {
    link.classList.add('active');
  }
});

function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(valor);
}

function initSimulator() {
  const form = document.getElementById('simulador-form');
  const valorBem = document.getElementById('valorBem');
  const prazo = document.getElementById('prazo');
  const entrada = document.getElementById('entrada');
  const entradaValor = document.getElementById('entradaValor');
  const parcela = document.getElementById('parcela');
  const resultadoEntrada = document.getElementById('resultadoEntrada');
  const creditoDisponivel = document.getElementById('creditoDisponivel');

  if (!form || !valorBem || !prazo || !entrada || !entradaValor || !parcela || !resultadoEntrada || !creditoDisponivel) {
    return;
  }

  const taxaAdministrativa = 0.015;

  function atualizarResultadoVisual() {
    const valor = Number(valorBem.value) || 0;
    const prazoValor = Number(prazo.value) || 60;
    const entradaPct = Number(entrada.value) / 100;
    const valorEntrada = valor * entradaPct;
    const saldo = valor - valorEntrada;
    const valorParcela = saldo > 0 ? (saldo * (1 + taxaAdministrativa)) / prazoValor : 0;

    parcela.textContent = formatarMoeda(valorParcela);
    resultadoEntrada.textContent = formatarMoeda(valorEntrada);
    creditoDisponivel.textContent = formatarMoeda(saldo);
  }

  function resetResultados() {
    entradaValor.textContent = entrada.value;
    parcela.textContent = 'R$ 0,00';
    resultadoEntrada.textContent = 'R$ 0,00';
    creditoDisponivel.textContent = 'R$ 0,00';
  }

  entrada.addEventListener('input', () => {
    entradaValor.textContent = entrada.value;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    atualizarResultadoVisual();
  });

  resetResultados();
}

initSimulator();
