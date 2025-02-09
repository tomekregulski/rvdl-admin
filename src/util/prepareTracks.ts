import { Track } from '../types/index';

export interface PreparedTrack {
  id: number;
  trackId: number;
  accompanied: string;
  alap: string;
  jor: string;
  jhalla: string;
  slowGat: string;
  mediumGat: string;
  fastGat: string;
  audioQuality: string;
  master: string;
  mediaType: string;
  notes: string | null;
  plays: number;
  primaryArtistId: number;
  public: string;
  raga: string;
  tapeId: number;
  url: string;
}

export function prepareTracks(tracks: Track[]) {
  const preparedTracks = tracks.map((track: Track) => {
    const preparedTrack: PreparedTrack = {
      id: track.id,
      trackId: track.trackId,
      accompanied: track.accompanied ? 'yes' : 'no',
      alap: track.alap ? 'yes' : 'no',
      jor: track.jor ? 'yes' : 'no',
      jhalla: track.jhalla ? 'yes' : 'no',
      slowGat: track.slowGat ? 'yes' : 'no',
      mediumGat: track.mediumGat ? 'yes' : 'no',
      fastGat: track.fastGat ? 'yes' : 'no',
      audioQuality: track.audioQuality,
      master: track.master ? 'yes' : 'no',
      mediaType: track.mediaType.name,
      notes: track.notes,
      plays: track.plays,
      primaryArtistId: track.primaryArtistId,
      public: track.public ? 'yes' : 'no',
      raga: track.raga.name,
      tapeId: track.tapeId,
      url: track.url,
    };
    return preparedTrack;
  });
  return preparedTracks;
}
