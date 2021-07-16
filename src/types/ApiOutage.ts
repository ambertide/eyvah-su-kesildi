/**
 * This is the Outage as it arrives from
 *  the API.
 */
type ApiOutage = {
  KesintiTarihi: string; // Date of the Outage starting.
  Aciklama: string; // Explanation as given.
  IlceAdi: string; // Location of the Outage.
  MahalleID: number[]; // IDs of the Neighborhoods.
  Mahalleler: string; // Names of the neighborhoods.
  AdSoyad: string; // ¯\_(ツ)_/¯
  Tip: string; // Type of the outage.
  ArizaGiderilmeTarihi: string; // Estimated time of outage ending.
  IlceID: number; // ID of the İlçe.
  Birim: string; //  Unit responsible for the area.
  ArizaID: number; // ID of the outage.
  ArizaDurumu: string; // Status of the Outage, if this is "1", then the outage is done.
  GuncellemeTarihi: string; // Date of last update.
  ArizaTipID: number; // Type of the outage.
  KayitTarihi: string; // Time the outage was saved.
  KesintiSuresi: string; // Time the outage will take to solve.
  Ongoru: string; // If this is "1", than the outage time is not known, if "2", than it is known.
};

export default ApiOutage;
