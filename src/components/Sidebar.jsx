import React from "react"
import styles from "./Sidebar.css"

import { data as cc } from "../data/mockCCTVdata"

function Sidebar({ show, hide }) {
  return (
    <div className={styles.sidebar + " " + (show ? styles.show : "")}>
      <div className={styles.inner}>
        sidebar
        <button onClick={hide}>hide</button>
        <ul>
          {cc.getCrossCctvInfoList.item.map(it => {
            return <li key={it.IXR_ID}>{it.ISTL_LCTN}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
