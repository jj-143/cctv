import React from "react"
import styles from "./Sidebar.css"

import { useDispatch, useSelector } from "react-redux"
import { selectAllCCTVs, setSelectedCCTV } from "../data/cctvSlice"

function Sidebar({ show, hide }) {
  // show only affects under 600px
  const dispatch = useDispatch()
  const cctvs = useSelector(selectAllCCTVs)

  return (
    <div className={styles.sidebar + " " + (show ? styles.show : "")}>
      <button className={styles.hideButton} onClick={hide}>
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
      <div className={styles.inner}>
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
