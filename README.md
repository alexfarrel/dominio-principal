# Domínio de Manutenção — Alexandre Oliveira

## Estrutura de Arquivos

```
├── maintenance.html       ← Página de manutenção (= index por enquanto)
├── 404.html               ← Página de erro 404
├── assets/                ← Pasta reservada para assets extras futuros
├── css/
│   ├── style.css          ← Estilos base (compartilhado pelas duas páginas)
│   └── 404.css            ← Estilos exclusivos da página 404
├── js/
│   └── i18n.js            ← Detecção de idioma + traduções + ano do copyright
└── images/
    └── flags/
        ├── en.png          ← Bandeira inglesa (PNG transparente)
        ├── es.png          ← Bandeira espanhola (PNG transparente)
        └── pt.png          ← Bandeira brasileira (PNG transparente)
```

---

## Idiomas

O arquivo `js/i18n.js` detecta automaticamente o idioma preferido do navegador.

**Prioridade:**
1. Idioma salvo pelo usuário (ao clicar nos botões da barra)
2. Idioma do sistema/navegador (`navigator.languages`)
3. Fallback: inglês

**Idiomas suportados:** Português (pt-BR), English, Español

Para alterar os textos de qualquer idioma, edite o objeto `traducoes` no `i18n.js`.

---

## Como configurar o link do botão "Ver vídeos"

Em `maintenance.html`, localize o elemento com a classe `.maintenance-btn` e troque o `href="#"` pelo link do portfólio:

```html
<a href="https://seudominio.com/en.html" class="maintenance-btn" ...>
```

---

## Como usar como index

Renomeie `maintenance.html` para `index.html` — ou configure seu servidor/hospedagem para servir `maintenance.html` como página padrão.

---

## Configuração do servidor para a 404

Para que o servidor sirva automaticamente o `404.html` em rotas inválidas, adicione conforme sua hospedagem:

**Apache (.htaccess):**
```
ErrorDocument 404 /404.html
```

**Nginx:**
```
error_page 404 /404.html;
```

**Netlify / Vercel (_redirects ou vercel.json):**
```
/* /404.html 404
```
