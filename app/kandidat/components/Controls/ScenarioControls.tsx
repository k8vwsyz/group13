import React from 'react'
import Button from '@material-ui/core/Button'
import { cancellingMove, laneChange, noLaneChange } from '../../utils/scenarios'
import styles from '../../styles/ScenarioControls.module.css'

const ScenarioControls = () => {
  return (
    <div className={styles.container}>
      <Button variant="contained" onClick={() => laneChange()}>Scenario 1: Lane change</Button>
      <Button variant="contained" onClick={() => noLaneChange()}>Scenario 2: No lane change</Button>
      <Button variant="contained" onClick={() => cancellingMove()}>Scenario 3: Cancelling move</Button>
    </div>
  )
}

export default ScenarioControls
