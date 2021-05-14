import { Admin } from "../types/server_types";
import { CarEvent, CarMetaEvent, Meta } from "../types/types";

export const generateMeta = (id: number, admin: string, room: string): Meta => ({ id, timestamp: new Date(), admin, room })

export const relevant = (admin: Admin, metaEvents: CarMetaEvent[]): CarEvent[] => metaEvents.filter(meta => meta.meta.admin === admin).map(meta => meta.carEvent)
