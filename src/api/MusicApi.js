import axios from 'axios'

const PLACEHOLDER = 'PLACEHOLDER'

const ALBUMS_FOR_ARTIST_QUERY = `select distinct ?albumName ?year ?picture ?band
 where {
      ?album dbp:artist ?band.
       ?album dbp:released ?year.
       ?album rdf:type dbo:Album.
       ?album dbp:name ?albumName.
       ?album dbo:thumbnail ?picture.
      ?band dbp:name "${PLACEHOLDER}"@en.
}
 limit 50`

const replacePlaceholderWithValueForQuery = (query, placeholderValue) => {
  const realQuery = query.replace(PLACEHOLDER, placeholderValue)
  return realQuery
}

const generateUrlWithQuery = (query) => {
  const encodedFormat = encodeURIComponent('format=application/sparql-results+json')
  const URL = `https://dbpedia.org/sparql?default-graph-uri=http://dbpedia.org&query=${query}&${encodedFormat}&timeout=30000&signal_void=on&signal_unconnected=on`
  return URL
}

export const musicApi = {
  getAlbumsForArtist: (aritstName) => {
    const query = replacePlaceholderWithValueForQuery(ALBUMS_FOR_ARTIST_QUERY, aritstName)
    return axios.get(generateUrlWithQuery(query))
  },
}
