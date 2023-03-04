import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Button, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";

const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?appid=57bf3b9c1321607efc63a452980cacb0&lang=es`;

let cityUrl = "&q=";


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
    temp: parseInt(""),
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
      
      if (data.error) throw { message: "Ciudad no encontrada"}
      console.log(data)
      setWeather({
        city: data.name,
        country: data.sys.country,
        temp: parseInt(data.main.temp)/10,
        condition: data.weather[0].main,
        conditionText: data.weather[0].description,
      })

    } catch (error) {
      console.log(error);
      setError({
        error: true,
        message: "Ciudad no encontrada",
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
          size="large"
          required
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          error={error.error}
          helperText={error.message}
        />
        <Button
          variant="contained"
          type="submit"
          startIcon={<ManageSearchIcon />}
          loading={loading}
          loadingIndicator="Cargando..."
          sx={{mt:1}}
          size="medium"
        >
          Buscar
        </Button>
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
            {weather.temp} °C
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