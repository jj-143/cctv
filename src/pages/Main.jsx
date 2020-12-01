import React, { useCallback, useEffect, useRef, useState } from "react"
import MapView from "../components/MapView"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

import styles from "./Main.css"

function Main() {
  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <>
      <Header />
      <main className={styles.main}>
        <button className={styles.menuButton} onClick={e => setShowSidebar(!showSidebar)}>
          menu
        </button>
        <Sidebar show={showSidebar} hide={() => setShowSidebar(false)} />
        <MapView />
      </main>
    </>
  )
}

export default Main
