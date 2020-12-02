import React, { useLayoutEffect, useRef, useEffect } from "react"
import styles from "./MapView.css"

import { selectAllCCTVs, setSelectedCCTV, viewCCTV } from "../data/cctvSlice"
import { useDispatch, useSelector } from "react-redux"

const dongnae = ["35.16539", "129.12561"]

function setupLeaflet() {
  let map = L.map("map", {}).setView(dongnae, 13)
  map.zoomControl.setPosition("topright")

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiamotZGV2IiwiYSI6ImNraTVtdnkxYjJpbmsycW5tdHpuY2k2ZWUifQ.Nrnc_lOpmYM97HxBgO_RLA",
    },
  ).addTo(map)

  return map
}
function MapView() {
  const mapRef = useRef()
  const markerMap = useRef(new Map())

  const dispatch = useDispatch()
  const selectedCCTV = useSelector(state => state.cctvs.selectedCCTV)

  const cctvs = useSelector(selectAllCCTVs)

  const addMarker = (cctv, latlong, msg) => {
    let [lat, long] = latlong
    let popup = L.popup()
    let button = L.DomUtil.create("button")
    button.textContent = "보기"
    L.DomEvent.on(button, "click", () => {
      dispatch(viewCCTV(cctv))
    })
    let newTab = L.DomUtil.create("a")
    newTab.textContent = "새창"
    newTab.href = cctv.URL
    newTab.target = "_blank"

    let content = L.DomUtil.create("div", "leaflet-popup-content-root")
    content.innerHTML = `
        <p>${msg}</p>
    `
    content.appendChild(button)
    content.appendChild(newTab)
    popup.setContent(content)
    popup.setLatLng(latlong)
    markerMap.current.set(cctv.ID, popup)
    L.marker([lat, long])
      .addTo(mapRef.current)
      .bindPopup(popup)
      .on("click", () => {
        dispatch(setSelectedCCTV(cctv))
      })
  }

  useEffect(() => {
    if (!selectedCCTV) return
    let popup = markerMap.current.get(selectedCCTV.ID)
    // center to selected
    let latlng = [selectedCCTV.CCTV_Y, selectedCCTV.CCTV_X]
    mapRef.current.panTo(latlng)

    // when marker's got clicked, the popup opens automatically.
    if (popup.isOpen()) return

    popup.setLatLng(latlng)
    popup.openOn(mapRef.current)
  }, [selectedCCTV])

  useLayoutEffect(() => {
    let map = (mapRef.current = setupLeaflet())

    return
    fetch("http://localhost:9191/gadm/json/skorea-municipalities-geo.json")
      .then(d => d.json())
      .then(data => {
        L.geoJSON(data, {
          filter: feature =>
            feature.properties.NAME_1 === "Busan" || feature.properties.NAME_1 === "Incheon",
          style: {
            strokeOpacity: 0.2,
            fillOpacity: 0.1,
          },
          onEachFeature: (feature, layer) => {
            if (feature.properties) {
              let name_1 = feature.properties.NAME_1
              let name_2 = feature.properties.NAME_2
              layer.bindPopup(`${name_1} - ${name_2}`)
            }
          },
        })
        // .addTo(map)
      })
  }, [])

  useLayoutEffect(() => {
    cctvs.forEach((it, idx) => {
      addMarker(it, [it.CCTV_Y, it.CCTV_X], it.NAME)
    })
  }, [cctvs])

  return (
    <div className={styles.mapView}>
      <div id="map"></div>
    </div>
  )
}

export default MapView
