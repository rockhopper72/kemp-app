import Vue from 'vue'
import VueRouter from 'vue-router'
import nprogress from 'nprogress'

Vue.use(VueRouter);

import App from './components/App.vue';

import Home from './components/Home.vue';
import Projects from './components/Projects.vue';
import Contact from './components/Contact.vue';

const routes = [
    {
        path: '/',
        name: 'home', 
        component: Home,
        meta: {
            title: 'Steven Kemp',
        }
    },
    { 
        path: '/projects', 
        name: 'projects', 
        component: Projects,
        meta: {
            title: 'Projects - Steven Kemp',
        }
    },
    { 
        path: '/contact', 
        name: 'contact', 
        component: Contact,
        meta: {
            title: 'Contact - Steven Kemp',
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }

    nprogress.start();
    next();
});

router.afterEach((to, from) => {
    nprogress.done();
});

const app = new Vue({
    data() {
        return {
            transition: 'slide-right',
        };
    },
    router,
    watch: {
        '$route' (to, from) {
            const routePaths = routes.map(route => route.path);
            const toPos = routePaths.indexOf(to.path);
            const fromPos = routePaths.indexOf(from.path);
            this.transition = toPos < fromPos ? 'slide-right' : 'slide-left';
        }
    },
    el: '#app',
    render: createElement => createElement(App),
});
