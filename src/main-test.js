import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'

const app = createApp(App)

// Connect lib of component globaly
components.forEach((el) => app.component(el.name, el))

// console.log('components', components)

app.mount('#app')

// import router from './router'
// import store from './store'

// createApp(App).use(store).use(router).mount('#app')
