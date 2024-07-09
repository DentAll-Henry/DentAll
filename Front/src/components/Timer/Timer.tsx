"use client"
import { useState, useEffect } from "react"

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(10 * 60)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  return (
    <div>
      <p>Tiempo restante: {formatTime(timeLeft)}</p>
    </div>
  )
}

export default Timer

