import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Loans from '../views/Loans.vue';
import Loan from '../views/Loan.vue';
import Customers from '../views/Customers.vue';
import Customer from '../views/Customer.vue';
import Plans from '../views/Plans.vue';
import Rates from '../views/Rates.vue';
import LoanCalculator from '../views/LoanCalculator.vue';
import CreateAccount from '../components/CreateAccount.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/loans',
    name: 'loans',
    component: Loans
  },
  {
    path: '/loans/:id',
    name: 'loan',
    component: Loan
  },
  {
    path: '/customers',
    name: 'customers',
    component: Customers
  },
  {
    path: '/customers/create',
    name: 'CreateAccount',
    component: CreateAccount
  },
  {
    path: '/customers/:id',
    name: 'customer',
    component: Customer
  },
  {
    path: '/plans',
    name: 'plans',
    component: Plans
  },
  {
    path: '/rates',
    name: 'rates',
    component: Rates
  },
  {
    path: '/calculate',
    name: 'calculate',
    component: LoanCalculator
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
