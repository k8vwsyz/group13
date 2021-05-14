import React from 'react'
import styles from '../styles/Vehicle.module.css'
import Image from 'next/image'
import InfotainmentWrapper from './infotainment/InfotainmentWrapper'


//The main component. Contains the infotainment-component
const Vehicle = () => {
  return (
    <div className={styles.vehicleBase}>
      <div className={styles.imageContainer}>
        <Image
          src="/dashboard.png"
          alt="Picture of a car dashboard"
          layout="fill"
        />
      </div>
      <div className={styles.dashboard}></div>
      <div className={styles.infotainment}>
        <InfotainmentWrapper />
      </div>
    </div>
  )
}

export default Vehicle