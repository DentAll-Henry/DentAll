import { ToothFace } from "./array/toothFace"
import Tooth from "./tooth"

function Teeth(props: any) {
  return (
    <div
      className="containTeeth"
      style={{
        width: "40px",
        height: "40px",
        border: "2px solid #000",
        transform: "rotate(45deg)",
        borderRadius: "50%",
        position: "relative",
      }}
    >
      {ToothFace.map((face: any, index) => {
        return <Tooth key={index} face={face} />
      })}
      {/* <Tooth
        top
        vestibularC={props.vestibularC}
        vestibularU={props.vestibularU}
      />
      <Tooth left distialC={props.distialC} distialU={props.distialU} />
      <Tooth right mastialC={props.mastialC} mastialU={props.mastialU} />
      <Tooth
        bottom
        palastinaC={props.palastinaC}
        palastinaU={props.palastinaU}
      />
      <Tooth center oclusalC={props.oclusalC} oclusalU={props.oclusalU} /> */}
    </div>
  )
}

export default Teeth

