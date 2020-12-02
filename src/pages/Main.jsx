import React, { useCallback, useEffect, useRef, useState } from "react"
import MapView from "../components/MapView"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import CCTVView from "../components/CCTVView"

import styles from "./Main.css"
import { useDispatch, useSelector } from "react-redux"
import { viewCCTV } from "../data/cctvSlice"

function Main() {
  const [showSidebar, setShowSidebar] = useState(false)
  const dispatch = useDispatch()
  const watching = useSelector(state => state.cctvs.watching)

  return (
    <>
      <Header />
      <main className={styles.main}>
        <button className={styles.menuButton} onClick={e => setShowSidebar(!showSidebar)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.4rem"
            viewBox="0 -53 384 384"
            width="1.4rem"
          >
            <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
            <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
            <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
          </svg>
        </button>
        <Sidebar show={showSidebar} hide={() => setShowSidebar(false)} />
        <MapView />
        {watching && <CCTVView cctv={watching} close={() => dispatch(viewCCTV(null))} />}
      </main>
    </>
  )
}

export default Main
