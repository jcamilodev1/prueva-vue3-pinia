const getFile = (route, url, extension = 'svg') => {
  return new URL(`/src/assets/${route}/${url}.${extension}`, import.meta.url).href
}

export default getFile
