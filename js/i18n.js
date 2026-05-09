/* ============================================================
   i18n.js — Detecção automática de idioma e tradução da página
   
   Como funciona:
   1. Lê o idioma preferido do navegador (ex: "pt-BR", "en-US")
   2. Mapeia para um dos três idiomas suportados: pt | en | es
   3. Aplica os textos corretos em todos os elementos com data-i18n="chave"
   4. Marca o botão de idioma correto como ativo
   5. Ao clicar em outro idioma, salva a preferência e re-aplica
   
   Para adicionar/alterar textos: edite o objeto `traducoes` abaixo.
============================================================ */


/* ------------------------------------------------------------
   DICIONÁRIO DE TRADUÇÕES
   Adicione novas chaves aqui e coloque data-i18n="chave" no HTML
------------------------------------------------------------ */
const traducoes = {

  /* ---- PORTUGUÊS BRASILEIRO ---- */
  pt: {
    /* <title> da aba do navegador */
    pageTitle: {
      maintenance: 'Em Manutenção — Alexandre Oliveira',
      '404':       '404 · Página não encontrada — Alexandre Oliveira',
    },

    /* Página de manutenção */
    badge:  'Em manutenção',
    title:  'Estamos preparando algo novo.',
    desc:   'O site está temporariamente indisponível enquanto realizamos melhorias e ajustes.',
    btn:    'Ver vídeos',
    note:   'Volte em breve.',
    rights: 'Todos os direitos reservados',

    /* Página 404 */
    title404: 'Esta página não existe',
    desc404:  'Parece que este vídeo foi deletado — ou talvez nunca esteve aqui. Volte e confira o conteúdo de verdade.',
    btn404:   'Voltar ao início',
  },

  /* ---- INGLÊS ---- */
  en: {
    pageTitle: {
      maintenance: 'Under Maintenance — Alexandre Oliveira',
      '404':       '404 · Page Not Found — Alexandre Oliveira',
    },

    badge:  'Under maintenance',
    title:  'We\'re preparing something new.',
    desc:   'The site is temporarily unavailable while we make improvements and adjustments.',
    btn:    'Watch videos',
    note:   'Check back soon.',
    rights: 'All rights reserved',

    title404: 'This page doesn\'t exist',
    desc404:  'Looks like this video got deleted — or maybe it was never here. Head back and check out the real content.',
    btn404:   'Back to home',
  },

  /* ---- ESPANHOL ---- */
  es: {
    pageTitle: {
      maintenance: 'En Mantenimiento — Alexandre Oliveira',
      '404':       '404 · Página no encontrada — Alexandre Oliveira',
    },

    badge:  'En mantenimiento',
    title:  'Estamos preparando algo nuevo.',
    desc:   'El sitio está temporalmente no disponible mientras realizamos mejoras y ajustes.',
    btn:    'Ver videos',
    note:   'Vuelve pronto.',
    rights: 'Todos los derechos reservados',

    title404: 'Esta página no existe',
    desc404:  'Parece que este video fue eliminado — o quizás nunca estuvo aquí. Vuelve y mira el contenido de verdad.',
    btn404:   'Volver al inicio',
  },
};


/* ------------------------------------------------------------
   DETECTA QUAL PÁGINA ESTÁ SENDO EXIBIDA
   Verifica se a URL contém "404" para escolher o título certo
------------------------------------------------------------ */
const ehPagina404 = window.location.pathname.includes('404');
const chavePagina = ehPagina404 ? '404' : 'maintenance';


/* ------------------------------------------------------------
   DETECTA O IDIOMA PREFERIDO
   
   Ordem de prioridade:
   1. Idioma salvo pelo usuário (localStorage)
   2. Idioma do navegador (navigator.language)
   3. Fallback: inglês
------------------------------------------------------------ */
function detectarIdioma() {
  /* Preferência salva pelo usuário tem prioridade máxima */
  const salvo = localStorage.getItem('idioma-preferido');
  if (salvo && traducoes[salvo]) return salvo;

  /* Lê os idiomas preferidos do navegador (pode ser uma lista) */
  const idiomas = navigator.languages || [navigator.language || 'en'];

  for (const idioma of idiomas) {
    /* Normaliza: "pt-BR" → "pt", "en-US" → "en", "es-419" → "es" */
    const codigo = idioma.toLowerCase().split('-')[0];
    if (traducoes[codigo]) return codigo;
  }

  /* Nenhum idioma suportado encontrado → inglês */
  return 'en';
}


/* ------------------------------------------------------------
   APLICA AS TRADUÇÕES NA PÁGINA
   Percorre todos os elementos com data-i18n e troca o texto
------------------------------------------------------------ */
function aplicarIdioma(lang) {
  const t = traducoes[lang];
  if (!t) return;

  /* Troca o <title> da aba */
  document.title = t.pageTitle[chavePagina];

  /* Troca o atributo lang do <html> para acessibilidade */
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;

  /* Percorre todos os elementos com data-i18n="chave" */
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    const chave = el.dataset.i18n;
    if (t[chave] !== undefined) {
      el.textContent = t[chave];
    }
  });

  /* Marca o botão de idioma ativo na barra */
  document.querySelectorAll('.lang-btn').forEach(function(btn) {
    const ativo = btn.dataset.lang === lang;
    btn.classList.toggle('lang-active', ativo);
    btn.setAttribute('aria-pressed', ativo ? 'true' : 'false');
  });
}


/* ------------------------------------------------------------
   EVENTO DE CLIQUE NOS BOTÕES DE IDIOMA
   Salva a escolha e re-aplica as traduções
------------------------------------------------------------ */
document.querySelectorAll('.lang-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const lang = btn.dataset.lang;
    /* Salva no localStorage para lembrar na próxima visita */
    localStorage.setItem('idioma-preferido', lang);
    aplicarIdioma(lang);
  });
});


/* ------------------------------------------------------------
   ANO ATUAL NO COPYRIGHT
------------------------------------------------------------ */
const elementoAno = document.getElementById('ano-atual');
if (elementoAno) {
  elementoAno.textContent = new Date().getFullYear();
}


/* ------------------------------------------------------------
   INICIALIZAÇÃO — roda assim que o script carrega
------------------------------------------------------------ */
aplicarIdioma(detectarIdioma());
