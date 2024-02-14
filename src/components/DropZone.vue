<template>
  <section class="drop">
    <div
      class="drop__drag-area"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragleave"
      @drop.prevent="onDrop"
    >
      <img :src="getFile('img', 'cloud')" alt="" />
      <span v-if="!isDragging">
        <p class="b-light">
          Drag and drop file, or
          <span class="drop__select b-semibold" role="button" @click="selectFiles"
            >Browse computer</span
          >
        </p>
        <p class="s-light text-center">Upload files up to 8gb</p>
      </span>

      <div v-else class="drop__select">Drop image here</div>
      <input type="file" name="file" class="file" ref="fileInput" multiple @change="onFileSelect" />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import getFile from '../helpers/getFile'

const model = defineModel()

defineProps({
  isOptional: {
    type: Boolean,
    default: true
  }
})

const isDragging = ref(false)
const images = ref([])
const fileInput = ref('')

const selectFiles = () => {
  fileInput.value.click()
}

const onFileSelect = (event) => {
  const files = event.target.files
  if (files.length === 0) return
  for (let i = 0; i < files.length; i++) {
    if (files[i].type.split('/')[0] != 'image') continue
    if (!images.value.some((e) => e.name === files[i].name)) {
      images.value.push({
        name: files[i].name,
        url: URL.createObjectURL(files[i]),
        file: files[i]
      })
    }
  }
  model.value = images.value
}

const onDrop = (event) => {
  event.preventDefault()
  isDragging.value = false
  const files = event.dataTransfer.files
  for (let i = 0; i < files.length; i++) {
    if (files[i].type.split('/')[0] != 'image') continue
    if (!images.value.some((e) => e.name === files[i].name)) {
      images.value.push({
        name: files[i].name,
        url: URL.createObjectURL(files[i]),
        file: files[i]
      })
    }
  }
}

const onDragOver = (event) => {
  event.preventDefault()
  isDragging.value = true
  event.dataTransfer.dropEffect = 'copy'
}

const onDragleave = (event) => {
  event.preventDefault()
  isDragging.value = false
}
</script>

<style lang="scss" scoped>
.drop {
  width: 100%;
  display: grid;
  gap: 4px;
  overflow: hidden;

  &__drag-area {
    padding: 2.4rem 1.6rem;
    height: 13.5rem;
    border-radius: 8px;
    border: 1px dashed #091d8b;
    background: linear-gradient(0deg, #f3f7ff, #f3f7ff), #d5ddfe;
    display: grid;
    gap: 8px;
    justify-items: center;
    user-select: center;
    -webkit-user-select: none;
    &.visible {
      font-size: 18px;
    }
  }
  &__select {
    cursor: pointer;
    transition: 0.4s;
    &:hover {
      opacity: 0.6;
    }
  }
}
.drop input,
.drop__drag-area .on-drop,
.drop__drag-area.dragover .visible {
  display: none;
}

.b-light {
  @media (max-width: 767px) {
    text-align: center;
  }
}
</style>
