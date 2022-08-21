import axios from 'axios'

// TODO: Remove this file
const constructImageUrl = (imageName) => {
  const imageURL = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/wiki/File:${imageName}`
  return imageURL
}

export const ImageApi = {
  getWorkingImage: (imageName) => {
    const imageURL = constructImageUrl(imageName)
    return axios.get(imageURL, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  },
}
