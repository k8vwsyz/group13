import React from 'react'
import { selectCars } from '../../redux/cars'
import { useAppSelector } from '../../redux/hooks'
import { selectLaneChange, selectLanesZoomedOut } from '../../redux/infotainment'
import Lanes, { LaneProps } from './Lanes'

export type LanesWrapperProps = {
  width: number,
  height: number,
}

const LanesRef = React.forwardRef<HTMLDivElement, LanesWrapperProps>((props, ref) => {
  const LanesWrapper = ({ width, height }: LanesWrapperProps) => {
    const cars = useAppSelector(selectCars)
    const zoomedOut = useAppSelector(selectLanesZoomedOut)
    const laneChange = useAppSelector(selectLaneChange)

    const props: LaneProps = { cars, zoomedOut, laneChange, width, height }

    return (
      <Lanes ref={ref} {...props} />
    )
  }
  return LanesWrapper(props)
})


export default LanesRef
