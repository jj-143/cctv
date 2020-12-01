import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"

import styles from "./CCTVView.css"

function CCTVView({ cctv, close }) {
  const handleOutside = e => {
    if (e.target === e.currentTarget) {
      close()
    }
  }

  const keyHandler = useCallback(e => {
    if (e.key === "Escape") {
      e.preventDefault()
      close()
    }
  }, [])

  useEffect(() => {
    addEventListener("keydown", keyHandler)
    return () => removeEventListener("keydown", keyHandler)
  }, [])

  return (
    <div className={styles.wrapper} onClick={handleOutside}>
      <div className={styles.cctvView}>
        <iframe className={styles.iframe} src={cctv.URL} />
      </div>
    </div>
  )
}

export default CCTVView
