import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
// import MainLayout from '@/components/MainLayout'
import Home from '@/pages/Home'
import Product from '@/pages/Product'
import API from '@/pages/API'
import APIDetail from '@/pages/APIDetail'
import Learn from '@/pages/Learn'
import LearnDetail from '@/pages/LearnDetail'
import Develop from '@/pages/Develop'
import GuideDetial from '@/pages/GuideDetial'
import Document from '@/pages/Document'
import Support from '@/pages/Support'
import Cases from '@/pages/Cases'
import CasesDetail from '@/pages/CasesDetail'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Password from '@/pages/Password'
import Pwdforget from '@/pages/Pwdforget'
import Profile from '@/pages/Profile'
import Application from '@/pages/Application'
import Consult from '@/pages/Consult'
import Apply from '@/pages/Apply'
import SupportList from '@/pages/SupportList'
import SupportCard from '@/components/SupportCard'
import Private from '@/pages/Private'
import Resource from '@/pages/Resource'
import ProfileEdit from '@/pages/ProfileEdit'
import MyPage from '@/pages/MyPage'
import Account from '@/pages/Account'
import AccountModification from '@/pages/AccountModification'
import NewSubaccount from '@/pages/NewSubaccount'
import Forum from '@/pages/Forum'
import ForumIndex from '@/components/ForumIndex'
import ForumTitle from '@/components/ForumTitle'
import UE from '@/components/UE'
import SectionDetail from '@/pages/SectionDetail'
import ForumSection from '@/pages/ForumSection'
import InvitationDetail from '@/pages/InvitationDetail'
import NewInvitation from '@/pages/NewInvitation'
import Review from '@/components/Review'
import PersonalCenter from '@/pages/PersonalCenter'
import PersonalHomepage from '@/pages/PersonalHomepage'
import OperationLog from '@/pages/OperationLog'
import MyTopicEdit from '@/pages/MyTopicEdit'
import PeopleCenter from '@/components/PeopleCenter'
import PeopleCenterNav from '@/components/PeopleCenterNav'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/home',
      name: 'Home',
      component: Home
    },{
      path: '/product/:pid',
      name: 'Product',
      component: Product,
      props: true
    },{
      path: '/learn',
      name: 'Learn',
      component: Learn
    },{
      path: '/LearnDetail/:courseId',
      name: 'LearnDetail',
      component: LearnDetail
    },{
      path: '/api',
      name: 'API',
      component: API
    },{
      path: '/APIDetail/:apiId',
      name: 'APIDetail',
      component: APIDetail
    },{
      path: '/develop',
      name: 'Develop',
      component: Develop
    },{
      path: '/GuideDetial',
      name: 'GuideDetial',
      component: GuideDetial
    },{
      path: '/document',
      name: 'Document',
      component: Document
    },{
      path: '/support',
      name: 'Support',
      component: Support
    },{
      path: '/cases',
      name: 'Cases',
      component: Cases
    },{
      path: '/CasesDetail/:caseId',
      name: 'CasesDetail',
      component: CasesDetail
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/register',
      name: 'Register',
      component: Register
    },{
      path: '/password',
      name: 'Password',
      component: Password
    },{
      path: '/pwdforget',
      name: 'Pwdforget',
      component: Pwdforget
    },{
      path: '/profile',
      name: 'Profile',
      component: Profile
    },{
      path: '/application',
      name: 'Application',
      component: Application
    },{
      path: '/consult',
      name: 'Consult',
      component: Consult
    },{
      path: '/apply',
      name: 'Apply',
      component: Apply
    },
    {
      path: '/private',
      name: 'Private',
      component: Private
    },
    {
      path: '/resource',
      name: 'Resource',
      component: Resource
    },
    {
      path: '/profileedit',
      name: 'ProfileEdit',
      component: ProfileEdit
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MyPage
    },
    {
      path:'/account',
      name:'Account',
      component:Account
    },
    {
      path:'/accountModification',
      name:'AccountModification',
      component:AccountModification
    },
    {
      path:'/newSubaccount',
      name:'NewSubaccount',
      component:NewSubaccount
    },
    {
      path:'/forum',
      name:'Forum',
      component:Forum
    },
    {
      path:'/sectionDetail',
      name:'SectionDetail',
      component:SectionDetail
    },
    {
      path:'/invitationDetail',
      name:'InvitationDetail',
      component:InvitationDetail
    },
    {
      path:'/newInvitation',
      name:'NewInvitation',
      component:NewInvitation
    },
    {
      path:'/personalCenter',
      name:'PersonalCenter',
      component:PersonalCenter
    },
    {
      path:'/personalHomepage',
      name:'PersonalHomepage',
      component:PersonalHomepage
    },
    {
      path:'/operationLog',
      name:'OperationLog',
      component:OperationLog
    },
    {
      path:'/myTopicEdit',
      name:'MyTopicEdit',
      component:MyTopicEdit
    },
    {
      path:'/peopleCenter',
      name:'PeopleCenter',
      redirect:'/peopleCenter/application',
      component:PeopleCenter,
      children:[
        { path: '/peopleCenter/application', component: Application},
        { path: '/peopleCenter/consult', component: Consult},
        { path: '/peopleCenter/profile', component: Profile},
        { path: '/peopleCenter/resource', component: Resource},
        { path: '/peopleCenter/personalHomepage', component: PersonalHomepage},
        { path: '/peopleCenter/operationLog', component: OperationLog},
        { path: '/peopleCenter/account', component: Account},
        { path: '/peopleCenter/password', component: Password},
      ]
    },
    {
      path:'/peopleCenterNav',
      name:'/PeopleCenterNav',
      component:PeopleCenterNav
    }
  ]
})
