import axios from 'axios'

const ALBUMS_FOR_ARTIST_QUERY = `select *
 where {
      ?album dbp:artist ?band.
      ?album dbp:released ?year.
      ?album rdf:type dbo:Album.
      ?album dbp:name ?albumName.
      OPTIONAL {
      ?album dbp:genre ?genre.
      }.
      ?band dbp:name "#0"@en.
}
 limit 50`

const ALBUM_FOR_ARTIST_QUERY = `select *
where {
     ?album dbp:artist ?band.
     ?album dbp:released ?year.
     ?album rdf:type dbo:Album.
     ?album dbo:abstract ?abstract.
     ?album dbp:name "#0"@en
     OPTIONAL {
     ?album dbp:genre ?genre.
     }.
     ?band dbp:name "#1"@en.
     FILTER langMatches(lang(?abstract),'en')
}
 limit 1`

const replaceQueryTemplateWithValues = (query, ...values) => {
  const templatedQuery = values.reduce((prev, current, index) => prev.replace(`#${index}`, current), query)
  return templatedQuery
}

const generateUrlWithQuery = (query) => {
  const encodedFormat = encodeURIComponent('format=application/sparql-results+json')
  const URL = `https://dbpedia.org/sparql?default-graph-uri=http://dbpedia.org&query=${query}&${encodedFormat}&timeout=30000&signal_void=on&signal_unconnected=on`
  return URL
}

export const musicApi = {
  getAlbumsForArtist: (aritstName) => {
    const query = replaceQueryTemplateWithValues(ALBUMS_FOR_ARTIST_QUERY, aritstName)
    return axios.get(generateUrlWithQuery(query))
  },
  getAlbumForArtist: (albumName, artistName) => {
    
    const query = replaceQueryTemplateWithValues(ALBUM_FOR_ARTIST_QUERY, albumName, artistName)
    return axios.get(generateUrlWithQuery(query))
  },
}
