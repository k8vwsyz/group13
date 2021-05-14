import React, { useState, useCallback, useEffect } from 'react'
import { Grid, Button, Slider, Select, FormControl, InputLabel, MenuItem, makeStyles, Typography } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { Car, NewCar } from '../../../interfaces/car'
import { carMoved_, carsRemoved_, newCarAdded_, selectCars } from '../../../redux/cars'


const useStyles = makeStyles((theme) => ({
  select: {
    minWidth: 100
  },
  spacing: {
    margin: theme.spacing(1)
  },
  container: {
    minHeight: '20em'
  },
  grow: {
    flexGrow: 1
  },
  basis: {
    display: 'flex', flexBasis: '0', width: '100%'
  },
  controlsContainer: {
    width: '100%', height: '100%', display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}))

const CarControls = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const cars = useAppSelector(selectCars)

  const [moveDisabled, setMoveDisabled] = useState(true)

  const [height, setHeight] = useState(50)
  const [lane, setLane] = useState<number | ''>('')
  const [selectedCar, setSelectedCar] = useState<string | ''>('')

  const handleHeightChange = useCallback((newValue: number | number[]) => {
    if (typeof newValue === "number")
      setHeight(newValue)
  }, [setHeight])

  const handleAddCar = useCallback(async () => {
    const newCar: NewCar = { lane: Number(lane), height: (100 - Number(height)) / 100, role: "generic" }
    // dispatch action to add a new car
    await dispatch(newCarAdded_(newCar))
  }, [height, lane])

  const handleRemoveCars = useCallback(() => {
    dispatch(carsRemoved_())
  }, [])

  const handleMoveCar = useCallback(async () => {
    const oldCar = cars.find(car => car.id === selectedCar)
    if (oldCar) {
      // create the new car that will replace the old one
      const modifiedCar: Car = {
        ...oldCar,
        lane: Number(lane),
        height: (100 - Number(height)) / 100,
      }
      // notify parent that a car should be modified
      await dispatch(carMoved_(modifiedCar))
    }
  }, [selectedCar, lane, height])

  useEffect(() => setMoveDisabled(selectedCar === '' || lane === ''), [selectedCar, lane])

  return (
    <Grid container className={classes.container}>
      <Grid className={classes.sliderContainer} item xs={1}>
        <Typography className={classes.spacing} variant="caption">height</Typography>
        <Slider
          className={classes.spacing}
          orientation="vertical"
          min={0}
          max={100}
          value={height}
          onChange={(_e, newValue) => handleHeightChange(newValue)}
          valueLabelDisplay="auto"
          track={false}
        />
      </Grid>
      <Grid direction="column" alignItems="center" container item xs={11}>
        <div className={classes.controlsContainer}>
          <Grid className={classes.basis} item xs={12}>
            <FormControl className={`${classes.spacing} ${classes.grow}`}>
              <InputLabel id="car-selector-label">car</InputLabel>
              <Select
                className={classes.select}
                labelId="car-selector-label"
                value={selectedCar}
                onChange={(e) => { const v = e.target.value as string; setSelectedCar(v) }}>
                <MenuItem value={''}>
                  <em>None</em>
                </MenuItem>
                {cars.map(car =>
                  <MenuItem key={car.id} value={car.id}>car {car.id}</MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl className={`${classes.spacing} ${classes.grow}`}>
              <InputLabel id="lane-selector-label">lane</InputLabel>
              <Select
                className={classes.select}
                labelId="lane-selector-label"
                value={lane}
                onChange={(e) => { const v = e.target.value as number; setLane(v) }}>
                <MenuItem value={''}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={0}>lane 1</MenuItem>
                <MenuItem value={1}>lane 2</MenuItem>
                <MenuItem value={2}>lane 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.basis} item xs={12}>
            <Button className={classes.spacing} variant="contained" onClick={() => handleAddCar()}>add car</Button>
            <Button className={classes.spacing} variant="contained" onClick={() => handleMoveCar()} disabled={moveDisabled}>move car</Button>
            <Button className={classes.spacing} variant="contained" onClick={() => handleRemoveCars()}>Remove cars</Button>
          </Grid>
        </div>
      </Grid>
    </Grid>
  )
}

export default CarControls
