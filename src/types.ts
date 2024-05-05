export interface Location {
  id: number;
  name: string;
}
export interface Category {
  id: number;
  name: string;
}

export interface Raga {
  id: number;
  name: string;
  alternateSpelling: string;
  time: string;
  rasa: string;
  tracks: Track[];
}

export interface Event {
  id: number;
  eventName: string;
  date: string;
  location: Location;
  locationId: number;
  category: Category;
  categoryId: number;
  notes: string;
  tapes: Tape[];
}
export interface Tape {
  id: number;
  eventId: number;
  tapeId: number;
  event: Event;
}

export interface Track {
  id: number;
  trackId: number;
  tapeId: number;
  ragaId: number;
  primaryArtistId: number;
  plays: number;
  alap: boolean;
  jor: boolean;
  jhalla: boolean;
  slowGat: boolean;
  mediumGat: boolean;
  fastGat: boolean;
  accompanied: boolean;
  notes: string | null;
  audioQuality: string;
  master: boolean;
  mediaTypeId: number;
  mediaType: MediaType;
  public: boolean;
  url: string;
  tape: Tape;
  raga: Raga;
}

export interface Artist {
  id: number;
  name: string;
  primaryTracks: Track[];
}
export interface MediaType {
  id: number;
  name: string;
  tracks: Track[];
}

export type Models =
  | Track
  | Tape
  | Location
  | Event
  | Raga
  | Category
  | Artist
  | MediaType;
