import React, { useState, useCallback } from 'react'
import { Grid, FormControl, InputLabel, Input, Button, FormGroup, FormControlLabel, Switch } from '@material-ui/core'
import { AlertInfoContent } from '../../../interfaces/car'
import { useAppDispatch } from '../../../redux/hooks'
import { alertInfoContentUpdated_, alertInfoUpdated_ } from '../../../redux/infotainment'

const AlertControls = () => {
  const dispatch = useAppDispatch()

  const [alertContent, setAlertContent] = useState<AlertInfoContent>({ amount: 0, distance: 0 })
  const [alert, setAlert] = useState(false)

  const handleAlertContentUpdated = useCallback(() => {
    dispatch(alertInfoContentUpdated_(alertContent))
  }, [alertContent])

  const handleAlertInfoUpdated = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const c = e.currentTarget.checked
    setAlert(c)
    dispatch(alertInfoUpdated_(c))
  }, [setAlert])

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl>
          <InputLabel htmlFor="distance-input">distance</InputLabel>
          <Input id="distance-input" value={alertContent.distance} onChange={e => {
            const n = Number(e.target.value)
            setAlertContent(old => ({ ...old, distance: n }))
          }} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="amount-input">amount</InputLabel>
          <Input id="amount-input" value={alertContent.amount} onChange={e => {
            const n = Number(e.target.value)
            setAlertContent(old => ({ ...old, amount: n }))
          }} />
        </FormControl>
        <Button onClick={() => handleAlertContentUpdated()} variant="contained">Update Alert Content</Button>
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={alert}
                onChange={handleAlertInfoUpdated} />
            }
            label="Display emergency vehicle info"
          />
        </FormGroup>
      </Grid>
    </Grid>
  )
}

export default AlertControls
