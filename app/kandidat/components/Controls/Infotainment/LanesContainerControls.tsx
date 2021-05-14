import React, { useState, useCallback } from 'react'
import { FormGroup, FormControlLabel, Switch, Box } from '@material-ui/core'
import { useAppDispatch } from '../../../redux/hooks'
import { lanesExpandedUpdated_, lanesZoomedOutUpdated_ } from '../../../redux/infotainment'

const LanesContainerControls = () => {
  const dispatch = useAppDispatch()

  const [expanded, setExpanded] = useState(false)
  const [zoomed, setZoomed] = useState(false)

  const handleExpandedChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const c = e.currentTarget.checked
    setExpanded(c)
    dispatch(lanesExpandedUpdated_(c))
  }, [setExpanded])

  const handleZoomedChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const c = e.currentTarget.checked
    setZoomed(c)
    dispatch(lanesZoomedOutUpdated_(c))
  }, [setZoomed])

  return (
    <Box>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={expanded}
              onChange={handleExpandedChanged} />
          }
          label="Expand lanes"
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={zoomed}
              onChange={handleZoomedChanged} />
          }
          label="Zoom out lanes"
        />
      </FormGroup>
    </Box>
  )
}

export default LanesContainerControls
