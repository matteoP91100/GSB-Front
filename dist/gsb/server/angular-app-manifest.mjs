
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  assets: {
    'index.csr.html': {size: 500, hash: 'b641e3eaa7b570fc5a058940ecc8cd24c92ff10ae108d571a705df95485937dd', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1013, hash: '51a893fb2c4bd8e3eb11bdd2b2355e7dd4f46281105c5fd17db14828c4267138', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
