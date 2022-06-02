import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
              {
                path: '/home',
                name: 'home',
                component: () => import('./views/Home.vue'),
                meta:{
                  requiresAuth: true,
                }
              },
              {
                path: '/',
                name: '/',
                component: () => import('./views/Home.vue'),
                meta:{
                  requiresAuth: true,
                }
              },
              {
                path: '/clients',
                name: 'clients',
                component: () => import('./views/Clients/Clients.vue')
              },
              {
                path: '/products',
                name: 'products',
                component: () => import('./views/Products/Products.vue')
              },
              {
                path: '/stock',
                name: 'stock',
                component: () => import('./views/Stock/Stock.vue')
              },
              {
                path: '/services-order',
                name: 'services-order',
                component: () => import('./views/Services-Order/Services-Order.vue')
              },
              {
                path: '/Reports',
                name: 'reports',
                component: () => import('./views/Reports.vue')
              },
              {
                path: '/maps',
                name: 'maps',
                component: () => import('./views/Maps.vue')
              },
              
            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
              {
                path: '/pages/login',
                name: 'page-login',
                component: () => import('@/views/pages/Login.vue')
              },
              {
                path: '/pages/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/Error404.vue')
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router
