export default {
  mounted(element, binding) {
    console.log('element', element)
    console.log('binding', binding)

    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    }

    const cb = (entries, observer) => {
      if (
        entries[0].isIntersecting
        // && this.page < this.totalPages
      ) {
        binding.value()
      }
    }

    const observer = new IntersectionObserver(cb, options)

    observer.observe(element)
  },

  name: 'intersection',
}
