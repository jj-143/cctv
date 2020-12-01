import React, { useCallback, useEffect, useRef, useState } from "react"
import MapView from "../components/MapView"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import CCTVView from "../components/CCTVView"

import styles from "./Main.css"
import { useDispatch, useSelector } from "react-redux"
import { viewCCTV } from "../data/cctvSlice"

function Main() {
  const [showSidebar, setShowSidebar] = useState(true)
  const dispatch = useDispatch()
  const watching = useSelector(state => state.cctvs.watching)

  return (
    <>
      <Header />
      <main className={styles.main}>
        <button className={styles.menuButton} onClick={e => setShowSidebar(!showSidebar)}>
          menu
        </button>
        <Sidebar show={showSidebar} hide={() => setShowSidebar(false)} />
        <MapView />
        {watching && <CCTVView cctv={watching} close={() => dispatch(viewCCTV(null))} />}
      </main>
    </>
  )
}

export default Main
