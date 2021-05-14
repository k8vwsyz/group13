import { EmitCarEvent } from "../types/server_types"
import { CarEvent } from "../types/types"

export const constructEmit = (carEvent: CarEvent): EmitCarEvent => {
  switch (carEvent.kind) {
    case "car_added":
      return { ev: "car_added", args: [carEvent.payload] }
    case "car_moved":
      return { ev: "car_moved", args: [carEvent.payload] }
    case "notification_played":
      return { ev: "notification_played", args: [carEvent.payload] }
    case "lanes_expanded":
      return { ev: "lanes_expanded", args: [] }
    case "lanes_zoomed_out":
      return { ev: "lanes_zoomed_out", args: [carEvent.payload] }
    case "notification_text_updated":
      return { ev: "notification_text_updated", args: [carEvent.payload] }
    case "alert_info_updated":
      return { ev: "alert_info_updated", args: [carEvent.payload] }
    case "alert_info_content_updated":
      return { ev: "alert_info_content_updated", args: [carEvent.payload] }
    case "lane_change_updated":
      return { ev: "lane_change_updated", args: [carEvent.payload] }
    case "lane_change_cleared":
      return { ev: "lane_change_cleared", args: [] }
    case "cars_removed":
      return { ev: "cars_removed", args: [] }
    case "car_removed":
      return { ev: "car_removed", args: [carEvent.payload] }
    case "duration_changed":
      return { ev: "duration_changed", args: [carEvent.payload] }
  }
}