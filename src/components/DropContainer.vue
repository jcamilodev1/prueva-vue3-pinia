<template>
  <div class="drop__container">
    <div class="drop__image" v-for="(image, index) in newImages" :key="index">
      <span class="delete" @click="deleteImage(index)">&times;</span>
      <img :src="image.url" />
    </div>

    <!-- <pre>{{ newImages }}</pre> -->
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
})

const newImages = computed(() => {
  return props.images
})
const deleteImage = (index) => {
  newImages.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.drop {
  &__image {
    width: 7.5rem;
    height: 7.5rem;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
    span {
      position: absolute;
      top: -2px;
      right: 9px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  &__container {
    margin-top: 32px;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    gap: 1.6rem;
  }
}

.delete {
  z-index: 999;
  color: #fe0000;
}
</style>
