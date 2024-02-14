<template>
  <button class="button" type="button" @click="$emit('uploadImage')">Upload</button>
</template>

<script setup></script>

<style lang="scss" scoped>
.button {
  outline: 0;
  border: 0;
  color: #fff;
  border-radius: 1.2rem;
  font-weight: 400;
  padding: 1.2rem;
  width: 100%;
  background-color: #091d8b;
  margin-top: 32px;
  cursor: pointer;
}
</style>
