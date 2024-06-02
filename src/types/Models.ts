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
  public: boolean;
  url: string;
  mediaType: MediaType;
  tape: Tape;
  raga: Raga;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  subscriptionActive: boolean;
  stripeId: string;
  isAdmin: boolean;
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

export type ModelsUnion =
  | Omit<Track, 'mediaType' | 'tape' | 'raga'>
  | Omit<Tape, 'event'>
  | Location
  | Omit<Event, 'location' | 'category' | 'tapes'>
  | Raga
  | Category
  | Artist
  | MediaType
  | User;

export type ModelsUpdateUnion =
  | Omit<Track, 'mediaType' | 'tape' | 'raga'>
  | Omit<Tape, 'event'>
  | Location
  | Omit<Event, 'location' | 'category' | 'tapes'>
  | Raga
  | Category
  | Artist
  | MediaType
  | User;

export type ModelsCreateUnion =
  | Omit<Track, 'id' | 'mediaType' | 'tape' | 'raga'>
  | Omit<Tape, 'event' | 'id'>
  | Omit<Location, 'id'>
  | Omit<Event, 'id' | 'location' | 'category' | 'tapes'>
  | Omit<Raga, 'id'>
  | Omit<Category, 'id'>
  | Omit<Artist, 'id' | 'primaryTracks'>
  | Omit<MediaType, 'id' | 'tracks'>
  | Omit<User, 'id'>;

export type DataTypes =
  | 'artist'
  | 'category'
  | 'event'
  | 'location'
  | 'media-type'
  | 'raga'
  | 'tape'
  | 'track'
  | 'user';
