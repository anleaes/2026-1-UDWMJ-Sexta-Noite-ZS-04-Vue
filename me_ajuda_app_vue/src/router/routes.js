const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Telas do Menu
      { path: '', name: 'Home', component: () => import('pages/IndexPage.vue') },
      { path: 'servicos', name: 'Servicos', component: () => import('pages/ServicosPage.vue') },
      {path: 'secretarias', name: 'Secretarias', component: () => import('pages/SecretariasPage.vue') },
      // Telas "Ocultas" (Exemplo de Criar e Editar)
      {path:'servicos/criar', name: 'CriarServico', component: () => import('pages/CriarServicoPage.vue') },
      {path:'servicos/editar', name: 'EditarServico', component: () => import('pages/EditarServicoPage.vue') },
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