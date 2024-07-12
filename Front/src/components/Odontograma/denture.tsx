import Teeth from "./teeth"
import { useState } from "react"

function Denture(props: any) {
  const [top1, setTop1] = useState(props.top_1)
  // const [top2, setTop2] = useState(props.top_2)
  // const [bottom1, setBottom1] = useState(props.bottom_1)
  // const [bottom2, setBottom2] = useState(props.bottom_2)

  return (
    <>
      {top1 && (
        <div className="dentureTop1">
          <div
            className="1"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={{ display: "flex" }}>
              <div className="18" style={{ padding: 3 }}>
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  18
                </p>
                <Teeth
                  vestibularC={() => {
                    props.tooth("Vestibular", 18, 1)
                  }}
                  vestibularU={() => {
                    props.Rtooth(1)
                  }}
                  distialC={() => {
                    props.tooth("Distial", 18, 2)
                  }}
                  distialU={() => {
                    props.Rtooth(2)
                  }}
                  mastialC={() => {
                    props.tooth("Mastial", 18, 3)
                  }}
                  mastialU={() => {
                    props.Rtooth(3)
                  }}
                  palastinaC={() => {
                    props.tooth("Palastina", 18, 4)
                  }}
                  palastinaU={() => {
                    props.Rtooth(4)
                  }}
                  oclusalC={() => {
                    props.tooth("Oclusal", 18, 5)
                  }}
                  oclusalU={() => {
                    props.Rtooth(5)
                  }}
                />
              </div>
              <div className="17" style={{ padding: 3 }}>
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  17
                </p>
                <Teeth
                  vestibularC={() => {
                    props.tooth("Vestibular", 17, 6)
                  }}
                  vestibularU={() => {
                    props.Rtooth(6)
                  }}
                  distialC={() => {
                    props.tooth("Distial", 17, 7)
                  }}
                  distialU={() => {
                    props.Rtooth(7)
                  }}
                  mastialC={() => {
                    props.tooth("Mastial", 17, 8)
                  }}
                  mastialU={() => {
                    props.Rtooth(8)
                  }}
                  palastinaC={() => {
                    props.tooth("Palastina", 17, 9)
                  }}
                  palastinaU={() => {
                    props.Rtooth(9)
                  }}
                  oclusalC={() => {
                    props.tooth("Oclusal", 17, 10)
                  }}
                  oclusalU={() => {
                    props.Rtooth(10)
                  }}
                />
              </div>
              <div className="16" style={{ padding: 3 }}>
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  16
                </p>
                <Teeth
                  vestibularC={() => {
                    props.tooth("Vestibular", 16, 11)
                  }}
                  vestibularU={() => {
                    props.Rtooth(11)
                  }}
                  distialC={() => {
                    props.tooth("Distial", 16, 12)
                  }}
                  distialU={() => {
                    props.Rtooth(12)
                  }}
                  mastialC={() => {
                    props.tooth("Mastial", 16, 13)
                  }}
                  mastialU={() => {
                    props.Rtooth(13)
                  }}
                  palastinaC={() => {
                    props.tooth("Palastina", 16, 14)
                  }}
                  palastinaU={() => {
                    props.Rtooth(14)
                  }}
                  oclusalC={() => {
                    props.tooth("Oclusal", 16, 15)
                  }}
                  oclusalU={() => {
                    props.Rtooth(15)
                  }}
                />
              </div>
              <div className="15" style={{ padding: 3 }}>
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  15
                </p>
                <Teeth
                  vestibularC={() => {
                    props.tooth("Vestibular", 15, 16)
                  }}
                  vestibularU={() => {
                    props.Rtooth(16)
                  }}
                  distialC={() => {
                    props.tooth("Distial", 15, 17)
                  }}
                  distialU={() => {
                    props.Rtooth(17)
                  }}
                  mastialC={() => {
                    props.tooth("Mastial", 15, 18)
                  }}
                  mastialU={() => {
                    props.Rtooth(18)
                  }}
                  palastinaC={() => {
                    props.tooth("Palastina", 15, 19)
                  }}
                  palastinaU={() => {
                    props.Rtooth(19)
                  }}
                  oclusalC={() => {
                    props.tooth("Oclusal", 15, 20)
                  }}
                  oclusalU={() => {
                    props.Rtooth(20)
                  }}
                />
              </div>
              <div className="14" style={{ padding: 3 }}>
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  14
                </p>
                <Teeth
                  vestibularC={() => {
                    props.tooth("Vestibular", 14, 21)
                  }}
                  vestibularU={() => {
                    props.Rtooth(21)
                  }}
                  distialC={() => {
                    props.tooth("Distial", 14, 22)
                  }}
                  distialU={() => {
                    props.Rtooth(22)
                  }}
                  mastialC={() => {
                    props.tooth("Mastial", 14, 23)
                  }}
                  mastialU={() => {
                    props.Rtooth(23)
                  }}
                  palastinaC={() => {
                    props.tooth("Palastina", 14, 24)
                  }}
                  palastinaU={() => {
                    props.Rtooth(24)
                  }}
                  oclusalC={() => {
                    props.tooth("Oclusal", 14, 25)
                  }}
                  oclusalU={() => {
                    props.Rtooth(25)
                  }}
                />
              </div>
              <div className="13" style={{ padding: 3 }}>
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  13
                </p>
                <Teeth
                  vestibularC={() => {
                    props.tooth("Vestibular", 13, 26)
                  }}
                  vestibularU={() => {
                    props.Rtooth(26)
                  }}
                  distialC={() => {
                    props.tooth("Distial", 13, 27)
                  }}
                  distialU={() => {
                    props.Rtooth(27)
                  }}
                  mastialC={() => {
                    props.tooth("Mastial", 13, 28)
                  }}
                  mastialU={() => {
                    props.Rtooth(28)
                  }}
                  palastinaC={() => {
                    props.tooth("Palastina", 13, 29)
                  }}
                  palastinaU={() => {
                    props.Rtooth(29)
                  }}
                  oclusalC={() => {
                    props.tooth("Oclusal", 13, 30)
                  }}
                  oclusalU={() => {
                    props.Rtooth(30)
                  }}
                />
              </div>
              <div className="12" style={{ padding: 3 }}>
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  12
                </p>
                <Teeth
                  vestibularC={() => {
                    props.tooth("Vestibular", 12, 31)
                  }}
                  vestibularU={() => {
                    props.Rtooth(31)
                  }}
                  distialC={() => {
                    props.tooth("Distial", 12, 32)
                  }}
                  distialU={() => {
                    props.Rtooth(32)
                  }}
                  mastialC={() => {
                    props.tooth("Mastial", 12, 33)
                  }}
                  mastialU={() => {
                    props.Rtooth(33)
                  }}
                  palastinaC={() => {
                    props.tooth("Palastina", 12, 34)
                  }}
                  palastinaU={() => {
                    props.Rtooth(34)
                  }}
                  oclusalC={() => {
                    props.tooth("Oclusal", 12, 35)
                  }}
                  oclusalU={() => {
                    props.Rtooth(35)
                  }}
                />
              </div>
              <div className="11" style={{ padding: 3 }}>
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  11
                </p>
                <Teeth
                  vestibularC={() => {
                    props.tooth("Vestibular", 11, 36)
                  }}
                  vestibularU={() => {
                    props.Rtooth(36)
                  }}
                  distialC={() => {
                    props.tooth("Distial", 11, 37)
                  }}
                  distialU={() => {
                    props.Rtooth(37)
                  }}
                  mastialC={() => {
                    props.tooth("Mastial", 11, 38)
                  }}
                  mastialU={() => {
                    props.Rtooth(38)
                  }}
                  palastinaC={() => {
                    props.tooth("Palastina", 11, 39)
                  }}
                  palastinaU={() => {
                    props.Rtooth(39)
                  }}
                  oclusalC={() => {
                    props.tooth("Oclusal", 11, 40)
                  }}
                  oclusalU={() => {
                    props.Rtooth(40)
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="21" style={{ padding: 3 }}>
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  21
                </p>
                <Teeth
                  vestibularC={() => {
                    props.tooth("Vestibular", 21, 41)
                  }}
                  vestibularU={() => {
                    props.Rtooth(41)
                  }}
                  distialC={() => {
                    props.tooth("Distial", 21, 42)
                  }}
                  distialU={() => {
                    props.Rtooth(42)
                  }}
                  mastialC={() => {
                    props.tooth("Mastial", 21, 43)
                  }}
                  mastialU={() => {
                    props.Rtooth(43)
                  }}
                  palastinaC={() => {
                    props.tooth("Palastina", 21, 44)
                  }}
                  palastinaU={() => {
                    props.Rtooth(44)
                  }}
                  oclusalC={() => {
                    props.tooth("Oclusal", 21, 45)
                  }}
                  oclusalU={() => {
                    props.Rtooth(45)
                  }}
                />
              </div>
              <div className="22" style={{ padding: 3 }}>
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  22
                </p>
                <Teeth
                  vestibularC={() => {
                    props.tooth("Vestibular", 22, 46)
                  }}
                  vestibularU={() => {
                    props.Rtooth(46)
                  }}
                  distialC={() => {
                    props.tooth("Distial", 22, 47)
                  }}
                  distialU={() => {
                    props.Rtooth(47)
                  }}
                  mastialC={() => {
                    props.tooth("Mastial", 22, 48)
                  }}
                  mastialU={() => {
                    props.Rtooth(48)
                  }}
                  palastinaC={() => {
                    props.tooth("Palastina", 22, 49)
                  }}
                  palastinaU={() => {
                    props.Rtooth(49)
                  }}
                  oclusalC={() => {
                    props.tooth("Oclusal", 22, 50)
                  }}
                  oclusalU={() => {
                    props.Rtooth(50)
                  }}
                />
              </div>
              <div className="23" style={{ padding: 3 }}>
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  23
                </p>
                <Teeth
                  vestibularC={() => {
                    props.tooth("Vestibular", 23, 51)
                  }}
                  vestibularU={() => {
                    props.Rtooth(51)
                  }}
                  distialC={() => {
                    props.tooth("Distial", 23, 52)
                  }}
                  distialU={() => {
                    props.Rtooth(52)
                  }}
                  mastialC={() => {
                    props.tooth("Mastial", 23, 53)
                  }}
                  mastialU={() => {
                    props.Rtooth(53)
                  }}
                  palastinaC={() => {
                    props.tooth("Palastina", 23, 54)
                  }}
                  palastinaU={() => {
                    props.Rtooth(54)
                  }}
                  oclusalC={() => {
                    props.tooth("Oclusal", 23, 55)
                  }}
                  oclusalU={() => {
                    props.Rtooth(55)
                  }}
                />
              </div>
              <div className="24" style={{ padding: 3 }}>
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  24
                </p>
                <Teeth
                  vestibularC={() => {
                    props.tooth("Vestibular", 24, 56)
                  }}
                  vestibularU={() => {
                    props.Rtooth(56)
                  }}
                  distialC={() => {
                    props.tooth("Distial", 24, 57)
                  }}
                  distialU={() => {
                    props.Rtooth(57)
                  }}
                  mastialC={() => {
                    props.tooth("Mastial", 24, 58)
                  }}
                  mastialU={() => {
                    props.Rtooth(58)
                  }}
                  palastinaC={() => {
                    props.tooth("Palastina", 24, 59)
                  }}
                  palastinaU={() => {
                    props.Rtooth(59)
                  }}
                  oclusalC={() => {
                    props.tooth("Oclusal", 24, 60)
                  }}
                  oclusalU={() => {
                    props.Rtooth(60)
                  }}
                />
              </div>
              <div className="25" style={{ padding: 3 }}>
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  25
                </p>
                <Teeth
                  vestibularC={() => {
                    props.tooth("Vestibular", 25, 61)
                  }}
                  vestibularU={() => {
                    props.Rtooth(61)
                  }}
                  distialC={() => {
                    props.tooth("Distial", 25, 62)
                  }}
                  distialU={() => {
                    props.Rtooth(62)
                  }}
                  mastialC={() => {
                    props.tooth("Mastial", 25, 63)
                  }}
                  mastialU={() => {
                    props.Rtooth(63)
                  }}
                  palastinaC={() => {
                    props.tooth("Palastina", 25, 64)
                  }}
                  palastinaU={() => {
                    props.Rtooth(64)
                  }}
                  oclusalC={() => {
                    props.tooth("Oclusal", 25, 65)
                  }}
                  oclusalU={() => {
                    props.Rtooth(65)
                  }}
                />
              </div>
              <div className="26" style={{ padding: 3 }}>
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  26
                </p>
                <Teeth
                  vestibularC={() => {
                    props.tooth("Vestibular", 26, 66)
                  }}
                  vestibularU={() => {
                    props.Rtooth(66)
                  }}
                  distialC={() => {
                    props.tooth("Distial", 26, 67)
                  }}
                  distialU={() => {
                    props.Rtooth(67)
                  }}
                  mastialC={() => {
                    props.tooth("Mastial", 26, 68)
                  }}
                  mastialU={() => {
                    props.Rtooth(68)
                  }}
                  palastinaC={() => {
                    props.tooth("Palastina", 26, 69)
                  }}
                  palastinaU={() => {
                    props.Rtooth(69)
                  }}
                  oclusalC={() => {
                    props.tooth("Oclusal", 26, 70)
                  }}
                  oclusalU={() => {
                    props.Rtooth(70)
                  }}
                />
              </div>
              <div className="27" style={{ padding: 3 }}>
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  27
                </p>
                <Teeth
                  vestibularC={() => {
                    props.tooth("Vestibular", 27, 71)
                  }}
                  vestibularU={() => {
                    props.Rtooth(71)
                  }}
                  distialC={() => {
                    props.tooth("Distial", 27, 72)
                  }}
                  distialU={() => {
                    props.Rtooth(72)
                  }}
                  mastialC={() => {
                    props.tooth("Mastial", 27, 73)
                  }}
                  mastialU={() => {
                    props.Rtooth(73)
                  }}
                  palastinaC={() => {
                    props.tooth("Palastina", 27, 74)
                  }}
                  palastinaU={() => {
                    props.Rtooth(74)
                  }}
                  oclusalC={() => {
                    props.tooth("Oclusal", 27, 75)
                  }}
                  oclusalU={() => {
                    props.Rtooth(75)
                  }}
                />
              </div>
              <div className="28" style={{ padding: 3 }}>
                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  28
                </p>
                <Teeth
                  vestibularC={() => {
                    props.tooth("Vestibular", 28, 76)
                  }}
                  vestibularU={() => {
                    props.Rtooth(76)
                  }}
                  distialC={() => {
                    props.tooth("Distial", 28, 77)
                  }}
                  distialU={() => {
                    props.Rtooth(77)
                  }}
                  mastialC={() => {
                    props.tooth("Mastial", 28, 78)
                  }}
                  mastialU={() => {
                    props.Rtooth(78)
                  }}
                  palastinaC={() => {
                    props.tooth("Palastina", 28, 79)
                  }}
                  palastinaU={() => {
                    props.Rtooth(79)
                  }}
                  oclusalC={() => {
                    props.tooth("Oclusal", 28, 80)
                  }}
                  oclusalU={() => {
                    props.Rtooth(80)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Denture

