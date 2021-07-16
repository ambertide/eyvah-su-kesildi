import axios from "axios";
import ApiOutage from "../types/ApiOutage";
import Outage from "../types/Outage";

/**
 * Get the outages from the API and set the state to the outages.
 * @param setOutages Sets the outage state in the React.
 */
function updateOutages(setOutages: any): void {
  axios
    .get("https://openapi.izmir.bel.tr/api/izsu/arizakaynaklisukesintileri")
    .then((response) => {
      return response.data;
    })
    .then((outages: ApiOutage[]): Outage[] => {
      return outages.map((outage): Outage => {
        let outageObject: Outage = {
          explanation: outage.Aciklama,
          location: outage.IlceAdi,
          type: outage.ArizaTipID,
          outage_start: outage.KesintiTarihi,
          neighborhoods: outage.Mahalleler.split(","),
          isActive: outage.ArizaDurumu !== "1",
        };
        if (outage.Ongoru === "2") {
          outageObject["outage_finish"] = outage.ArizaGiderilmeTarihi;
        }
        return outageObject; // Convert the API version of outage
        // To the app version.
      });
    })
    .then((outages: Outage[]) => {
      setOutages(outages);
    })
    .catch((error) => {
      console.log(error);
    });
}

export default updateOutages;
