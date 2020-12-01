import React, { useState, useLayoutEffect, useRef } from "react"
import styles from "./MapView.css"
const url = `https://its.busan.go.kr/traffic/exclude/cctvPopup.do?cctvid=261&title=문전교차로(하).진구&isvr=undefined`

import { data as cc } from "../data/mockCCTVdata"

const dongnae = [35.2, 129.1]

function addMarker(map, latlong, msg) {
  let [lat, long] = latlong
  let marker = L.marker([lat, long])
    .addTo(map)
    .bindPopup(
      `<div>
      ${msg}
      </div>`,
    )
    .openPopup()
}

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

  useLayoutEffect(() => {
    let map = (mapRef.current = setupLeaflet())

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

        cc.getCrossCctvInfoList.item.forEach((it, idx) => {
          // it.value = Math.random() * 100
          addMarker(mapRef.current, [it.CMRA_X_CRDN, it.CMRA_Y_CRDN], it.ISTL_LCTN)
        })
      })
  }, [])

  return (
    <div className={styles.mapView}>
      <div id="map"></div>
    </div>
  )
}

export default MapView
