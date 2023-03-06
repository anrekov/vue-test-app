# vue-test-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Tips
<!-- @click='$emit("remove", post)' -->
- $emit - передать событие вверх(родителю) 

<!-- @remove='removePost' -->
- @anyEvent - прослушать событие ребёнка

<!-- components.forEach((el) => app.component(el.name, el)) -->
- app.component - добавить компонент глобально, чтобы не импортить постоянно (важно! - дб name: 'some-name', и именно так будет использоваться компонент [только kebab или только camel case])

<!-- Write them at the same lvl as *methods* / *data* -->
- life cycle hooks:
  - beforeCreate
  - created
  - beforeMount
  - mounted
  - beforeUpdate
  - updated	
  - beforeUnmount
  - unmounted
  - =========	
  - errorCaptured
  - renderTracked
  - renderTriggered
  - activated	
  - deactivated

<!-- analogs for useMemo and useEffect -->
- watch - следит за изменение одноименного поля
- 