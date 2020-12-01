import React from "react"
import styles from "./Sidebar.css"

import { useDispatch, useSelector } from "react-redux"
import { selectAllCCTVs, setSelectedCCTV } from "../data/cctvSlice"

function Sidebar({ show, hide }) {
  const dispatch = useDispatch()
  const cctvs = useSelector(selectAllCCTVs)

  return (
    <div className={styles.sidebar + " " + (show ? styles.show : "")}>
      <div className={styles.inner}>
        <button className={styles.hideButton} onClick={hide}>
          hide
        </button>
        <ul className={styles.ul}>
          {cctvs.map(it => {
            return (
              <li key={it.ID} onClick={() => dispatch(setSelectedCCTV(it))}>
                {it.NAME}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
