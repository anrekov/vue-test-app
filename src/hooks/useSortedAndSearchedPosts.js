import { computed, ref } from 'vue'

export default function useSortedAndSearchedPosts(posts) {
  const searchQuery = ref('')

  const sortedAndSearchedPosts = computed(() =>
    posts.value.value.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )

  return { searchQuery, sortedAndSearchedPosts }
}
