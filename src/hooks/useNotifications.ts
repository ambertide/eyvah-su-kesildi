import { useEffect } from "react";
import { getNewArrayMembers } from "../controller/utils";
import Outage from "../types/Outage";
import logo from "../resources/logo.svg";

/**
 * Set up a subscription to a district, if new outages have
 * occurred in there, send a notification to the user.
 * @param previousOutages Outages that was taken from the previous GET request.
 * @param outages outages that have occurred in the most recent GET request.
 * @param gotPermission Boolean indicating if notification permissions were taken from the user.
 * @param subscribedDistrict
 */
export function useNotifications(
  previousOutages: Outage[] | undefined,
  outages: Outage[] | undefined,
  gotPermission: boolean,
  subscribedDistrict: string
): void {
  useEffect(() => {
    if (
      !gotPermission ||
      previousOutages === undefined ||
      outages === undefined
    ) {
      return;
    }
    let newMembers = getNewArrayMembers(previousOutages, outages);
    if (subscribedDistrict !== "") {
      newMembers = newMembers.filter(
        (element) => element.location === subscribedDistrict
      );
      // If a district is provided, filter the outages to that district.
    }
    // In any case, if the newMembers is still active...
    if (newMembers.length > 0) {
      let notification = new Notification("Eyvah, su kesilecek!", {
        body: `${newMembers[0].location} ilçesinde su kesilecek.`,
        icon: logo,
      });
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          notification.close(); // This will allow us to
          // Close a notification when app is opened according
          // to MDN. Snippet is from MDN's using the notification
          // API documentation.
        }
      });
    }
  });
}
