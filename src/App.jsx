//console.log(import.meta.env.VITE_APY_KEY);

import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";

//const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APY_KEY}&q=`;

const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?appid=${import.meta.env.VITE_APY_KEY}&lang=es`;
let cityUrl = "&q=";

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

export default function App() {
  
  const [city , setCity] = useState("");
  const [loading , setLoading]= useState(false);
  const [error , setError]= useState({
    error: false,
    message: "",
  })
  
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temp: "",
    condition: "",
    conditionText: "",
  });

  const onSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    setError({
      error: false,
      message: "",
    });
    try{
      if(!city.trim()) throw { message : "El campo ciudad es obligatorio"}
      console.log(city)
      const response = await fetch(`${API_WEATHER}${cityUrl}${city}`);
      const data = await response.json();
      
      if (data.error) throw { message: data.error.message}
      console.log(data)
      setWeather({
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        condition: data.weather[0].main,
        conditionText: data.weather[0].description,
      })

    } catch (error) {
      console.log(error);
      setError({
        error: true,
        message: error.message,
      });
    }finally{
      setLoading(false);
    }
  }
  
  return(
    <Container
      maxWidth="xs"
      sc={{ p:10 }}
    >
      <Typography 
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
      >
        Wheather App
      </Typography>
      <Box
        sc={{display: "gird", gap:2 }}
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField 
          id="city"
          label="Ciudad"
          variant="outlined"
          size="samll"
          required
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          error={error.error}
          helperText={error.message}
        />
        <LoadingButton
          type="submit"
          varint="text"
          loading={loading}
          loadingIndicator="Cargando..."
          color="error"
          size="large"
        >
          Buscar
        </LoadingButton>
      </Box>

      {weather.city && (
        <Box
          sx={{
            mt:2,
            display:"gird",
            gap:2,
            textAlign:"center",
          }}
        >
          <Typography variant="h4" component="h2">
            {weather.city}, {weather.country}
          </Typography>
          <Box>
            {weather.condition.toUpperCase()},
          </Box>
          <Typography variant="h5" component="h3">
            {weather.temp.toString()} °C
          </Typography>
          <Typography variant="h6" component="h4">
            {weather.conditionText.toUpperCase()}
          </Typography>
          
        </Box>
      )}

      <Typography
        textAlign="center"
        sx={{mt:2 , fontSize: "10px"}}
      >
        Powered by:{" "}
        <a
          href="https://www.weatherapi.com/"
          title="Weather API"
        >
          WeatherAPI.com
        </a>
        </Typography>
        <Typography
        textAlign="center"
        sx={{mt:2 , fontSize: "10px"}}
      >
          By Martin Tamola
        </Typography>
    </Container>
  )
}