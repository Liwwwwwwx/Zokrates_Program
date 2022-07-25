import Vue from 'vue'
import Router from 'vue-router'
import InfoEncry from '@/pages/InfoEncry'
import Proof from '@/pages/proof'
import Verify from '@/pages/verify';
Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            name:'InfoEncry',
            component: InfoEncry
        },
        {
            path:'/Proof',
            name:'Proof',
            component: Proof
        },
        {
            path:'/Verify',
            name:'Verify',
            component:Verify
        }
    ]
})