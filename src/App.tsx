import React from "react";
import "./App.css";
import OutageCard from "./components/OutageCard";
import updateOutages from "./controller/outage_api";
import Outage from "./types/Outage";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardColumns from "react-bootstrap/CardColumns";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import { usePrevious } from "./hooks/usePrevious";
import { OutageNotifier } from "./components/OutageNotifier";

function App() {
  const [outages, setOutages] = React.useState<Outage[] | undefined>();
  const prevOutages = usePrevious(outages);
  const [refresh, setRefresh] = React.useState(0);
  const [useOld, setUseOld] = React.useState(false);
  React.useEffect(() => {
    updateOutages(setOutages);
    setTimeout(
      () => setRefresh((previousRefresh) => previousRefresh + 1),
      1800000
    ); // Refresh outages once every thirty minutes.
  }, [refresh]);
  return (
    <Container fluid className="p-0">
      <Jumbotron fluid>
        <Container>
          <h1>Eyvah, Su Kesildi!</h1>
          <p>
            Bu sitede İzmir Büyükşehir Belediyesi sınırları içerisindeki su
            kesintilerini görebilirsiniz.
          </p>
          <Form>
            <Form.Switch
              id="showFormer"
              checked={useOld}
              onChange={() => setUseOld((previousUseOld) => !previousUseOld)}
              label="Eski Kesintileri de Göster"
            />
            <OutageNotifier outages={outages} previousOutages={prevOutages} />
          </Form>
        </Container>
      </Jumbotron>
      <Row>
        <Col sm="12" md={{ span: 10, offset: 1 }}>
          <CardColumns>
            {outages
              ?.filter((outage) => useOld || outage.isActive)
              .map((outage, index) => (
                <OutageCard
                  outage={outage}
                  outageKey={`outage${outage.location}`}
                />
              ))}
          </CardColumns>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
