import React, { useEffect } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
const SelectFields = () => {

  const [state, setState] = React.useState([])
  const [county, setCounty] = React.useState([])
  const [city, setCity] = React.useState([])
  const [zipCode, setZipCode] = React.useState([])
  const [selectedState, setSelectedState] = React.useState('')
  const [selectedCounty, setSelectedCounty] = React.useState('')
  const [selectedCity, setSelectedCity] = React.useState('')
  const [selectedZipCode, setSelectedZipCode] = React.useState('')

  useEffect(() => {
    fetch('http://us-addresses.herokuapp.com/state/')
      .then((res) => res.json())
      .then((data) => {
        setSelectedState(data[0].name)
        setState(data)
        const stateId = data[0].id
        fetch(`http://us-addresses.herokuapp.com/county/?state=${stateId}`)
          .then((res) => res.json())
          .then((data) => {
            setSelectedCounty(data[0].name)
            setCounty(data)
            const countyID = data[0].id
            fetch(`http://us-addresses.herokuapp.com/city/?county=${countyID}`)
              .then((res) => res.json())
              .then((data) => {
                setSelectedCity(data[0].name)
                setCity(data)
                const cityID = data[0].id
                fetch(
                  `http://us-addresses.herokuapp.com/zip-code/?city=${cityID}`
                )
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data)
                    setSelectedZipCode(data[0].zip_code)
                    setZipCode(data)
                  })
              })
              .catch((err) => console.log(err))
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (
      selectedState !== '' &&
      selectedCounty !== '' &&
      selectedCity !== '' &&
      selectedZipCode !== ''
    ) {
      const stateId = state.filter((da) => da.name === selectedState)
      console.log(stateId)
      fetch(`http://us-addresses.herokuapp.com/county/?state=${stateId[0].id}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedCounty(data[0].name)
          setCounty(data)
          const countyID = data[0].id
          fetch(`http://us-addresses.herokuapp.com/city/?county=${countyID}`)
            .then((res) => res.json())
            .then((data) => {
              setSelectedCity(data[0].name)
              setCity(data)
              const cityID = data[0].id
              fetch(
                `http://us-addresses.herokuapp.com/zip-code/?city=${cityID}`
              )
                .then((res) => res.json())
                .then((data) => {
                  setSelectedZipCode(data[0].zip_code)
                  setZipCode(data)
                })
                .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    }
  }, [selectedState])

  return (
    <div>
      {/* show state in mayerialui selected field */}
      <FormControl>
        <InputLabel id='demo-simple-select-label'>State</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={selectedState}
          onChange={(value) => setSelectedState(value.target.value)}
        >
          {state.map((state) => (
            <MenuItem key={state.id} value={state.name}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* show county in mayerialui selected field */}
      <FormControl>
        <InputLabel id='demo-simple-select-label'>County</InputLabel>

        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={selectedCounty}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          {county.map((county) => (
            <MenuItem key={county.id} value={county.name}>
              {county.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* show city in mayerialui selected field */}
      <FormControl>
        <InputLabel id='demo-simple-select-label'>City</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={selectedCity}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          {city.map((city) => (
            <MenuItem key={city.id} value={city.name}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* show zip code in mayerialui selected field */}
      <FormControl>
        <InputLabel id='demo-simple-select-label'>Zip Code</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={selectedZipCode}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          {zipCode.map((zipCode) => (
            <MenuItem key={zipCode.id} value={zipCode.zip_code}>
              {zipCode.zip_code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectFields
