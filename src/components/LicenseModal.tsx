import { Modal, Button } from "react-bootstrap";
// eslint-disable-next-line import/no-webpack-loader-syntax
import otherLicenses from "../resources/licenses.json";
import { useEffect, useState } from "react";

interface LicenseModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

/**
 * Taken from https://react-bootstrap-v4.netlify.app/components/modal/
 *
 * @param props
 * @returns
 */
export function LicenseModal(props: LicenseModalProps) {
  const { showModal, setShowModal } = props;
  const [licenses, setLicenses] = useState("");
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Diğer Lisanslar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Veriler, İzmir Büyüşehir Belediyesi açık veri portalı kapsamındaki İZSU
        Arıza Kaynaklı Su Kesintileri Web Servisi üzerinden alınmaktadır. Bunun
        dışında, aşağıdaki açık kaynak kodlu programlar bu websitesinin
        yapımında kullanılmıştır:
      </Modal.Body>
      <Modal.Body>
        <div style={{ maxHeight: "250px" }}>
          {otherLicenses.licenseText.split("\n").map((element, index) => (
            <p key={`paragraph${index}`}>{element}</p>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShowModal(false)}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
