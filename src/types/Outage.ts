type Outage = {
  location: string; // Written as İlçe.
  explanation: string;
  type: number;
  outage_start: string;
  outage_finish?: string;
  neighborhoods: string[];
  isActive: boolean; // If the outage is still unsolved.
};

export default Outage;
