import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import directives from '@/directives'
import router from './router/router'
import VIntersection from './directives/VIntersection'
import store from '@/store'

const app = createApp(App)

components.forEach((el) => app.component(el.name, el))

directives.forEach((el) => app.directive(el.name, el))

app.use(router).use(store).mount('#app')
