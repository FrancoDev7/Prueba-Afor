import './style.css'


document.querySelector('#app').innerHTML = `
  <div>
    <h1>Prueba Afor Clima</h1>
    <form>
      <input type="text" id="location" placeholder="Ingresa una ubicacion" />
      <button type="submit">Enviar</button>
    </form>

    <div>
      <h2>Resultados</h2>
      <p id='temp'>Temperatura: 0 °C</p>
      <p id='humidity'>Humedad: 0 %</p>

      
    </div>
    <p id='error' style='color:red'></p>
  </div>
`

const API_KEY = 'c5ebdde899bee15f5f552139c07b6310'
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'



async function getWeather(cityName) {
  const url = `${API_URL}?q=${cityName}&appid=${API_KEY}`
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
  return data
}

document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault()
  const location = document.querySelector('#location').value
  const error = document.getElementById('error')
  
  // si no se ingresa nada y se da al boton de enviar se muestra una alerta para que escriba una ubicacion
  if (!location) {
    alert('Ingresa una ubicacion')
    return
  }

  
  try {
    const data = await getWeather(location)


    if (data.cod !==  200) {
      error.innerHTML = `La ciudad ${location} no se encuentra`
      return
    }

    console.log(data)
    document.getElementById('temp').innerHTML = `Temperatura: ${data.main.temp} °C`
    document.getElementById('humidity').innerHTML = `Humedad: ${data.main.humidity} %`

    
  } catch (error) {
    console.log(error)
    error.innerHTML = 'Error al obtener los datos'

    
  }

})

