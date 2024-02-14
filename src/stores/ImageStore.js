import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useImageStore = defineStore('ImageStore', () => {
  const status = ref(null)

  const uploadFile = async (file) => {

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      status.value = 'Archivo subido correctamente';
      return response.data;
    } catch (error) {
      status.value = 'Error al subir el archivo';
      throw error;
    }
  }

  return { status, uploadFile }
})
