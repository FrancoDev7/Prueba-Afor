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
      <p id='temp'>Temperatura: 0°C</p>
      <p id='humidity'>Humedad: 0%</p>

      
    </div>
    <p id='error' style='color:red'></p>
  </div>
`

const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL



async function getWeather(cityName) {
  const url = `${API_URL}?q=${cityName}&appid=${API_KEY}`
  const response = await fetch(url)
  const data = await response.json()
  //console.log(data)
  return data
}

document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault()
  const location = document.querySelector('#location').value
  const error = document.getElementById('error')

  // Limpiar mensajes previos
  error.innerHTML = ''
  document.getElementById('temp').innerHTML = 'Temperatura: 0°C'
  document.getElementById('humidity').innerHTML = 'Humedad: 0%'
  
  // si no se ingresa nada y se da al boton de enviar se muestra una alerta para que escriba una ubicacion
  if (!location) {
    alert('Ingresa una ubicacion')
    return
  }

  try {
    const data = await getWeather(location)

    // aqui evaluo si la peticion es exitosa o no si no lo es porque da un 404 error 
    if (data.cod !==  200) {
      error.innerHTML = `La ciudad ${location} no se encuentra`
      return
    }

    //console.log(data)
    // convertir la temperatura de kelvin a celsius los grados kelvin son 273.15 
    const temp = (data.main.temp - 273.15).toFixed(0) // convertir a entero
    document.getElementById('temp').innerHTML = `Temperatura: ${temp}°C`
    document.getElementById('humidity').innerHTML = `Humedad: ${data.main.humidity}%`

  } catch (error) {
    console.log(error)
    error.innerHTML = 'Error al obtener los datos'
  }
})

