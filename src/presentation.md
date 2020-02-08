@class.center

# Server Side Rendering com React
## Next.js, Razzle e `renderToString`

---

@class.center
@class.tertiary

### Abdiel Brilhante

- dev @ Oowlish (**we're hiring!**)
- github.com/abdielbrilhante

---

@class.secondary

## Antes do SSR...

- Aplicações web tradicionais
- Single Page Applications
- Quais são os problemas e desafios de SPAs?

---

@class.fill

![](/images/csr_ssr.png)

---

@class.fill

![](/images/medium.png)

---

@class.fill

![](/images/hybrid.png)

---

## Como o React faz renderização híbrida?

- 'react-dom/server'.renderToString
- 'react-dom/server'.renderToStaticMarkup
- 'react-dom'.hydrate

---

@class.center
@class.secondary

### Se o React já provê as funções de renderização...
### Por que usar frameworks?

---

## O que ferramentas disponíveis já fazem

- Builds de desenvolvimento e produção
- Code splitting
- Routing
- Hot module replacement (server **e** client)
- JS prefetching
- Conteúdo do HTML inicial (`<head>`)
- Requisições HTTP
- ...

---

## Algumas dessas ferramentas

- Next.js
- Razzle + After.js
  - Maior controle em relação ao Next.js
- Electrode
- create-universal-react-app

---

## Desafios

- Boa parte dos problemas é de configuração, e não do dia-a-dia de desenvolvimento
- Gerenciar dois ambientes bem diferentes
  + localStorage
- requests no servidor e data hydration
  + getInitialProps
  + getDataFromTree (Apollo Client)
  + Como seria no Redux/useReducer?

---

## Deploy

- Arquitetura e recursos
  + Antes: um simples servidor de arquivos
  + Depois: um servidor Node.js
- CI
  + Antes: simples upload
  + Depois: ?
- [Operationalizing Node.js for Server Side Rendering](https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9)
