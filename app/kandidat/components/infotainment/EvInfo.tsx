import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import styles from '../../styles/EvInfo.module.css'
// import WarningIcon from '@material-ui/icons/Warning'
import WarningIcon from './ev_alert.svg'
import DistanceIcon from './distance_icon.svg'
import EvIcon from './ev_icon.svg'

const useStyles = makeStyles({
  fontSize: { fontSize: '0.8rem' }
})

//Type. Move to interfaces?
type Props = {
  distance: number,
  amount: number,
}

//Type. Move to interfaces?
type AlertProps = {
  text?: string,
}

const distanceToString = (distance: number) => {
  const rounded = Math.round(distance)
  return rounded >= 1000 ? `${rounded / 1000}km` : `${rounded}m`
}

const AlertItem: React.FunctionComponent<AlertProps> = (props) => {
  const { text } = props
  const classes = useStyles()

  return (
    <div className={styles.alertContainer}>
      <div className={styles.alertIcon}>
        {props.children}
      </div>
      {text &&
        <Typography className={classes.fontSize}>{text}</Typography>
      }
    </div>
  )
}

const EvInfo = ({ distance, amount }: Props) => {
  const distanceString = distanceToString(distance)

  return (
    <div className={styles.alertBar}>
      <div className={styles.warning}>
        <WarningIcon />
      </div>
      <AlertItem text={distanceString}>
        <DistanceIcon />
      </AlertItem>
      <AlertItem text={Math.round(amount).toString()}>
        <EvIcon />
      </AlertItem>
    </div>
  )
}

export default EvInfo