<template>
  <input class="input" type="text" @input='updateInput' :value="modelValue" />
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number], // Для двустороннего связывания
    myCustomValue: [String]
  },
  methods: {
    updateInput(event) { // Для двустороннего связывания
      this.$emit('update:modelValue', event.target.value)
      this.$emit('update:myCustomValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  padding: 10px 15px;
  margin-top: 15px;
  width: 100%;
  border: 2px solid teal;
  border-radius: 12px;
}
</style>