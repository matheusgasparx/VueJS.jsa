// --- início rotas
import { createRouter, createWebHistory } from 'vue-router'
//   createWebHasHistory
//import Contratos from '@/components/vendas/Contratos.vue'
//import Dashboard from '@/components/dashboard/Dashboard.vue'
//import DashboardRodape from '@/components/dashboard/DashboardRodape.vue'
// import Home from '@/views/Home.vue'
// import Indicadores from '@/components/servicos/Indicadores.vue'
// import Lead from '@/components/vendas/Lead.vue'
// import Leads from '@/components/vendas/Leads.vue'
// import Login from '@/views/Login.vue'
// import Opcoes from '@/components/servicos/Opcoes.vue'
// import PaginaNaoEncontrada from '@/views/PaginaNaoEncontrada.vue'
// import Servico from '@/components/servicos/Servico.vue'
// import Servicos from '@/components/servicos/Servicos.vue'
// import Site from '@/views/Site.vue'
// import Vendas from '@/components/vendas/Vendas.vue'
// import VendasPadrao from '@/components/vendas/VendasPadrao.vue'

// lazy loading
const Contratos = () => import(/* webpackChunkName: "vendas" */'@/components/vendas/Contratos.vue')
const Dashboard = () => import(/* webpackChunkName: "dashboard" */'@/components/dashboard/Dashboard.vue')
const DashboardRodape = () => import(/* webpackChunkName: "dashboard" */'@/components/dashboard/DashboardRodape.vue')
const Home = () => import('@/views/Home.vue')
const Indicadores = () => import(/* webpackChunkName: "servicos" */'@/components/servicos/Indicadores.vue')
const Lead = () => import(/* webpackChunkName: "vendas" */'@/components/vendas/Lead.vue')
const Leads = () => import(/* webpackChunkName: "vendas" */'@/components/vendas/Leads.vue')
const Login = () => import('@/views/Login.vue')
const Opcoes = () => import(/* webpackChunkName: "servicos" */'@/components/servicos/Opcoes.vue')
const PaginaNaoEncontrada = () => import('@/views/PaginaNaoEncontrada.vue')
const Servico = () => import(/* webpackChunkName: "servicos" */'@/components/servicos/Servico.vue')
const Servicos = () => import(/* webpackChunkName: "servicos" */'@/components/servicos/Servicos.vue')
const Site = () => import('@/views/Site.vue')
const Vendas = () => import(/* webpackChunkName: "vendas" */'@/components/vendas/Vendas.vue')
const VendasPadrao = () => import(/* webpackChunkName: "vendas" */'@/components/vendas/VendasPadrao.vue')

const routes = [
    {
        path: '/', //localhost:8080/        
        alias: '/app',
        component: Site,
        meta: { requerAutorizacao: false }
    },    
    {
        path: '/home', //localhost:8080/home
        meta: { requerAutorizacao: true },
        alias: '/app',
        component: Home,
        children: [
            {
                path: 'vendas', component: Vendas, children:
                    [
                        { 
                            path: 'leads', 
                            component: Leads, 
                            name: 'leads',
                            beforeEnter() {
                                //poderiamos verificar se o usuário tem permissão de carregar a rota
                                console.log('Guarda global beforeEnter')
                            }
                        }, //localhost:8080/home/vendas/leads
                        { 
                            path: 'leads/:id/:outroParametro', 
                            props: true,   //** metodo 1
                            /*
                            props: {            ** metodo 2
                                id: 4,
                                outroParametro: 'pt-br'
                            },
                            */
                            /*
                            props: route => {   // ** metodo 3
                                let teste = route.query.idioma ? route.query.idioma : route.params.outroParametro
                                // implementando uma lógica para definir as props que serão submetidas para o componente
                                return {
                                    id: parseInt(route.params.id) + 1,
                                    outroParametro: teste
                                }
                            },
                            */
                            component: Lead, 
                            name: 'lead', 
                            alias: [
                                '/l/:id/:outroParametro', 
                                '/pessoa/:id/:outroParametro', 
                                '/:id/:outroParametro'
                              ] 
                            }, //localhost:8080/home/vendas/lead/5 - router params, parametros dinamicos
                        { path: 'contratos', component: Contratos, name: 'contratos' }, //localhost:8080/home/vendas/contratos
                        { path: '', component: VendasPadrao,  name: 'vendas' } //localhost:8080/home/vendas/
                    ]
            }, //localhost:8080/home/vendas
            { path: 'servicos', component: Servicos, name: 'servicos', children:
                    [
                        { 
                            path: ':id',
                            props: {
                                default: true,
                                indicadores: true,
                                opcoes: true
                            },
                            alias: '/s/:id', 
                            name: 'servico', 
                            components:
                            {
                                default: Servico,
                                indicadores: Indicadores,
                                opcoes: Opcoes
                            }
                        } //localhost:8080/home/servicos/5
                    ]
            }, //localhost:8080/home/servicos
            { path: 'dashboard', components: 
                {
                    default: Dashboard,
                    rodape: DashboardRodape
                } 
            } //localhost:8080/home/dashboard
        ]
    },
    {
        path: '/', //localhost:8080/site
        component: Site
    },
    {
        path: '/login', //localhost:8080/login
        component: Login,
        meta: { requerAutorizacao: false }
    },
    { path: '/redirecionamento-1', redirect: '/home/servicos' },
    { path: '/redirecionamento-2', redirect: { name: 'leads' } },
    { path: '/redirecionamento-3', redirect: '/home/vendas' },
    { path: '/redirecionamento-4', redirect: { name: 'vendas' } },
    { path: '/redirecionamento-5', redirect: to => {
            // podemos programar algo antes do redirecionamento ser efetivado
            console.log(to)

            return { name: 'vendas' }
        }
    },
    { path: '/:catchAll(.*)*', component: PaginaNaoEncontrada }
]
// --- fim rotas

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        // return { left: 0, top: 150}
        console.log(to.hash)
        if(savedPosition) {
            return savedPosition
        }

        if(to.hash){
            return { el: to.hash}
        }
        
        return { left: 0, top: 0}    
    },
    routes //routes: routes
})

router.beforeEach(() => {
    console.log('Guarda global beforeEach')

    // if(to.meta.requerAutorizacao){
    //     console.log('Validar o acesso')
    // } else {
    //     console.log('Apenas seguir a navegação')
    // }

    // console.log('Origem: ', from)
    // console.log('Destino: ', to)
    // // verificar se o usuário está autorizado a acessar a rota
    // console.log('Metodo executado antes do acesso a rota destino')
})

router.afterEach(() => {
    console.log('Guarda global beforeEach')

    // console.log('Origem: ', from)
    // console.log('Destino: ', to)
})

router.beforeResolve(() => {
    console.log('Guarda global beforeResolve')
})

export default router