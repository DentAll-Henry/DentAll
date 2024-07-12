"use client"
import { useState } from "react"
import Odontogram from "./odontogram"

function OdontVist() {
  const [data, setData] = useState([])

  return (
    <div className="App">
      <Odontogram
        tooth={(labelT: any, zoneT: any, idT: any) => {
          setData((oldArray) => [
            ...oldArray,
            {
              label: labelT,
              zone: zoneT,
              id: idT,
            },
          ])
        }}
        rtooth={(id: any) => {
          setData((current) =>
            current.filter((obj) => {
              return obj.id !== id
            })
          )
        }}
      />
      <div
        style={{ padding: "1rem", display: "flex", justifyContent: "center" }}
      >
        <button
          onClick={() => {
            console.log(data)
          }}
        >
          Guardar (Console.log)
        </button>
      </div>
    </div>
  )
}

export default OdontVist

