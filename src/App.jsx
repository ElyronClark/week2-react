import { useState, useEffect } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url)
    .then(rest => rest.json())
    .then(result => {
      setData(result)
      setLoading(false)
    })
  }, [url])

  return {data, loading}
}

function App() {
  const [count, setCount] = useState(0)
  const [jokeKey, setJokeKey] = useState(0)
  const { data: joke, loading} = useFetch(`https://official-joke-api.appspot.com/random_joke?k=${jokeKey}`)

  return (
    <div>
      <h1> Hello React</h1>
      {loading ? <p>Loading joke...</p> : <p>{joke.setup} — {joke.punchline}</p>}
      <p>Count: {count}</p>
      <button onClick={() => { setCount(count + 1); setJokeKey(jokeKey + 1)}}>
        Add 1
      </button>
      <button onClick={() => setCount(0)}>
        Reset Count
      </button>
    </div>
  )
}

export default App