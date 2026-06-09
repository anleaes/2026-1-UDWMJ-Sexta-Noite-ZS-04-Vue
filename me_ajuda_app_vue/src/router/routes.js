const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Telas do Menu
      { path: '', name: 'Home', component: () => import('pages/IndexPage.vue') },
      { path: 'servicos', name: 'Servicos', component: () => import('pages/ServicosPage.vue') },

      // Telas "Ocultas" (Exemplo de Criar e Editar)
      // { path: 'cidadaos/criar', name: 'CriarCidadao', component: () => import('pages/CriarCidadaoScreen.vue') },
      // { path: 'cidadaos/editar/:id', name: 'EditarCidadao', component: () => import('pages/EditarCidadaoScreen.vue') },

      // ... Adicione as demais rotas seguindo esta lógica
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes