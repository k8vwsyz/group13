import React, { useState, useEffect } from 'react'
import styles from '../../styles/Lanes.module.css'
import carStyles from '../../styles/Car.module.css'
import { Car } from '../../interfaces/car'
import { animated, useSpring } from '@react-spring/web'
import { motion } from 'framer-motion'
import { calculateCarX, calculateCarY, calculateLaneChangeX, calculateLaneChangeY } from '../../utils/carUtils'

const LaneDivider = () => {
  const b = new Array(4).fill(0).map((_, i) => i)

  return (
    <div className={styles.laneDivider}>
      <div className={styles.overflowContainer}>
        {
          b.map((e) => {
            return (
              <React.Fragment key={e.toString()}>
                <div className={styles.whiteMarker}></div>
                <div className={styles.blankMarker}></div>
              </React.Fragment>
            )
          })
        }
        <div className={styles.whiteMarker}></div>
      </div>
    </div>
  )
}

type CarProps = {
  top: number,
  left: number
  width: number,
  height: number,
  carSprite: string,
  duration: number,
  role: string,
}

class CarComponent extends React.PureComponent<CarProps> {
  render() {
    const { left, top, width, height, carSprite, duration }: CarProps = this.props
    return (
      <motion.div
        transition={{ type: "tween", duration, ease: "easeInOut" }}
        animate={{ left, top }}
        style={{ left, top, width, height }}
        className={carStyles.container}>
        <img src={`/${carSprite}`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} />
      </motion.div>
    )
  }
}

type LaneChangeProps = {
  angle: number,
  top: number,
  left: number,
  width: number,
  height: number,
  cancelling: boolean,
}

const LaneChange = ({ angle, top, left, width, height, cancelling }: LaneChangeProps) => {
  return (
    <div className={`${styles.positionAbsolute}`} style={{
      top, left, width, height, transform: `rotate(${angle}deg)`
    }}>
      <div style={{ width: '100%', height: '100%' }} className={styles.positionAbsolute}>
        {!cancelling && <LaneChangeArrowSvg />}
      </div>
      <div style={{
        width: '100%', height: "100%", transform: "rotate(45deg)",
        display: 'flex', justifyContent: 'center', alignContent: 'center'
      }} className={styles.positionAbsolute}>
        {cancelling && <LaneChangeCancelledSvg />}
      </div>
    </div>
  )
}

const LaneChangeArrowSvg = () => (
  <svg viewBox="0 0 50 100" fill="none">
    <g className={styles.move}>
      <path d="M0 100 L0 95 L25 75 L50 95 L50 100 L25 80 Z" fill="#66bb6a" stroke="#2A3439" />
      <path d="M0 90  L0 85 L25 65 L50 85 L50 90  L25 70 Z" fill="#66bb6a" stroke="#2A3439" />
      <path d="M0 80  L0 75 L25 55 L50 75 L50 80  L25 60 Z" fill="#66bb6a" stroke="#2A3439" />
    </g>
  </svg>
)

const LaneChangeCancelledSvg = () => (
  <svg className={styles.pulse} viewBox="0 0 26.458 26.458">
    <path d="m0 2.6458 2.6458-2.6458 23.812 23.812-2.6458 2.6458z" fill="#d32f2f" stroke="#2A3439" />
    <path d="m23.812 5e-7 2.6458 2.6458-23.812 23.812-2.6458-2.6458z" fill="#d32f2f" stroke="#2A3439" />
  </svg>
)

const createLaneChange = (
  laneChange: LaneChange | null,
  top: number,
  left: number,
  width: number,
  height: number,
) => {
  console.log(laneChange, top, left, width, height)
  if (laneChange) {
    const directionToAngle = (d: "left" | "right") => { if (d === "left") return -45; else return 45 }
    const laneChangeProps = {
      top, left, width, height, angle: directionToAngle(laneChange.direction), cancelling: laneChange.cancelling
    }
    return <LaneChange {...laneChangeProps} />
  }
}

export type LaneChange = {
  laneDivider: number, // 1 indexed -- e.g. 1 is between the first (0) and second (1) lane
  direction: "left" | "right"
  height: number,
  cancelling: boolean
}

export type LaneProps = {
  cars: Car[],
  width: number,
  height: number,
  zoomedOut: boolean,
  laneChange: LaneChange | null
}

const LanesRef = React.forwardRef<HTMLDivElement, LaneProps>((props, ref) => {
  const Lanes = ({ cars, width, height, zoomedOut, laneChange }: LaneProps) => {
    const laneCount = 3
    const dividerWidth = width * 0.03
    const laneWidth = (width - dividerWidth * (laneCount - 1)) / laneCount
    const carWidth = laneWidth * 0.8

    const carX = (car: Car): number => calculateCarX(car, laneWidth, dividerWidth, carWidth)
    const carY = (car: Car): number => calculateCarY(car, height)

    const [laneChangeComponent, setLaneChangeComponent] = useState<JSX.Element | undefined>(undefined)

    useEffect(() => {
      if (!laneChange) {
        setLaneChangeComponent(undefined)
        return
      }

      const arrowWidth = laneWidth
      const arrowHeight = arrowWidth * 2

      const arrowX = calculateLaneChangeX(laneChange, arrowWidth, dividerWidth, arrowWidth)
      const arrowY = calculateLaneChangeY(laneChange, height)

      setLaneChangeComponent(createLaneChange(laneChange, arrowY, arrowX, arrowWidth, arrowHeight))
    }, [laneChange, laneWidth, dividerWidth, height])

    const [scaleProps, setScaleProps] = useSpring({ scale: 1 }, [zoomedOut])

    useEffect(() => { setScaleProps({ scale: zoomedOut ? 0.35 : 1 }) }, [zoomedOut])

    return (
      <div className={styles.container}>
        <animated.div style={scaleProps} className={styles.fixedRatio}>
          <div ref={ref} className={`${styles.fill} ${styles.positionAbsolute} ${styles.displayFlex}`}>
            <div className={styles.lane}></div>
            <LaneDivider />
            <div className={styles.lane}></div>
            <LaneDivider />
            <div className={styles.lane}></div>
            {
              cars.map((car) => {
                return (
                  <CarComponent
                    key={car.id}
                    role={car.role}
                    left={carX(car)}
                    top={carY(car)}
                    width={carWidth}
                    height={carWidth * car.hwRatio}
                    carSprite={car.sprite}
                    duration={car.duration} />
                )
              })
            }
          </div>
          {laneChangeComponent}
        </animated.div>
      </div>
    )
  }
  return Lanes(props)
})


// based on https://stackoverflow.com/a/60978633
export const useContainerDimensions = (myRef: React.RefObject<HTMLDivElement>) => {

  const getDimensions = () => ({
    width: myRef.current?.offsetWidth ?? 0,
    height: myRef.current?.offsetHeight ?? 0
  })

  const getPositions = () => ({
    x: myRef.current?.offsetLeft ?? 0,
    y: myRef.current?.offsetTop ?? 0
  })

  const handleResize = () => {
    setDimensions(getDimensions())
    setPositions(getPositions())
  }

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [positions, setPositions] = useState({ x: 0, y: 0 })

  useEffect(() => {
    handleResize()

    if (myRef.current) {
      setDimensions(getDimensions())
      setPositions(getPositions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return {
    width: dimensions.width,
    height: dimensions.height,
    x: positions.x,
    y: positions.y,
    handleResize
  }
};

export default LanesRef
