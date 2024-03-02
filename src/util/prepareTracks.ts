import { Track } from 'src/types';

export function prepareTracks(tracks: Track[]) {
  const preparedTracks = tracks.map((track: Track) => {
    const preparedTrack = {
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
      master: track.master,
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
