import { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import Outage from "../types/Outage";
import districts from "../resources/districts.json";
import { useNotifications } from "../hooks/useNotifications";
interface outageNotifierProps {
  outages: Outage[] | undefined;
  previousOutages: Outage[] | undefined;
}

/**
 * Composed of two sections.
 * 1) Is the visual look of the outage picker, this is
 *  where we will ask the user to pick a location to be notified.
 * 2) Is the Notification service, let's go!.
 */
export function OutageNotifier(props: outageNotifierProps) {
  const { outages, previousOutages } = props;
  const [shouldNotify, setShouldNotify] = useState(false);
  const [district, setDistrict] = useState("");
  const districtSelect = useRef<HTMLSelectElement>(null);
  const [gotPermission, setGotPermission] = useState(
    Notification.permission === "granted"
  );
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission().then(() => {
        setGotPermission(Notification.permission === "granted");
      });
    }
  }, [shouldNotify]);
  useNotifications(previousOutages, outages, gotPermission, district);

  return (
    <Form.Group>
      <Form.Switch
        id="notify"
        checked={shouldNotify && gotPermission}
        disabled={Notification.permission === "denied"} // No need to ask the user again.
        onChange={() =>
          setShouldNotify((previousShouldNotify) => !previousShouldNotify)
        }
        label="Aşağıdaki ilçedeki kesintileri takip et:"
      />
      <Form.Control
        as="select"
        disabled={!shouldNotify}
        ref={districtSelect}
        custom
        onChange={() => {
          if (districtSelect.current?.value) {
            setDistrict(districtSelect.current?.value);
          }
        }}
      >
        <option value="">Hepsi</option>
        {districts.districts.map((districtName, index) => (
          <option key={`izmirDistrict${index}`}>{districtName}</option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}
