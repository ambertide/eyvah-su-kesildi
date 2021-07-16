import { capitalize, dateConvert, getDate } from "../controller/utils";
import Outage from "./../types/Outage";
import Card from "react-bootstrap/Card";
import "./OutageCard.css";
import ListGroup from "react-bootstrap/ListGroup";
import { ClockHistory } from "react-bootstrap-icons";

type OutageCardProps = {
  outage: Outage; // Contains information on outage.
  outageKey: string; // ID of the outagecard.
};

function OutageCard(props: OutageCardProps) {
  return (
    <Card className="mb-3 OutageCard" key={props.outageKey}>
      <Card.Body>
        <Card.Title>
          <h5>{capitalize(props.outage.location)}</h5>
        </Card.Title>
        <Card.Subtitle>
          <ClockHistory size={19} /> {getDate(props.outage.outage_start) + ", "}{" "}
          {dateConvert(props.outage.outage_start)} -{" "}
          {props.outage.outage_finish
            ? dateConvert(props.outage.outage_finish)
            : ""}
        </Card.Subtitle>
      </Card.Body>
      <Card.Header>Mahalleler</Card.Header>
      <ListGroup
        variant="flush"
        style={{ maxHeight: "100px", overflowY: "auto" }}
      >
        {props.outage.neighborhoods.map((element) => (
          <ListGroup.Item key={`${props.outageKey}element`}>
            {capitalize(element)}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

/**
 * 
    <section className={"OutageCard " + getOutageType(props.outage.type)}>
      <div className="OutageCardText">
        <h2 className="OutageCardTitle">{capitalize(props.outage.location)}</h2>
        <ul className="OutageCardNeighborhoods">
          {props.outage.neighborhoods.map((neighborhood, index) => (
            <li key={index}>{capitalize(neighborhood)}</li>
          ))}
        </ul>
        <p>
          {" "}
          {dateConvert(props.outage.outage_start)} -{" "}
          {props.outage.outage_finish
            ? dateConvert(props.outage.outage_finish)
            : ""}
        </p>
      </div>
    </section>
 */

export default OutageCard;
