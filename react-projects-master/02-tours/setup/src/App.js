import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'

function App() {
  
  const [isLoading, setIsLoading] = useState(true)
  const [tours, setTours] = useState([])

  const fetchTours = async() => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const tours = await response.json()
      setIsLoading(false)
      setTours(tours)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTours()
  }, [])

  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    )
  }

  const removeTour = (id) => {
    const newTours = tours.filter(tour => tour.id !== id)
    setTours(newTours)
  }

  return (
    <main>
      {isLoading && <main><Loading/></main>}
      {tours && <Tours tours={tours} removeTour={removeTour}/>}
    </main>
  )
}

export default App
