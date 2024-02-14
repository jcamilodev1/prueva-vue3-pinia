<template>
  <section class="main">
    <DropZone v-model="images" />
    <DropContainer :images="images" />
    <DropButton @click="handleUpload" />
  </section>
</template>

<script setup>
import DropContainer from '@/components/DropContainer.vue'
import DropZone from '@/components/DropZone.vue'
import DropButton from '@/components/DropButton.vue'
import { useImageStore } from '../stores/ImageStore'
import { ref } from 'vue'

const imageStore = useImageStore()
const images = ref([])

const handleUpload = async () => {
  try {
    const file = images.value
    await imageStore.uploadFile(file[0].file)
    const response = imageStore.response

    console.log('Respuesta:', response)
  } catch (error) {
    console.error('Error en la carga:', error)
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 32px;
}
</style>
../stores/imagesStore
