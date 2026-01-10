import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';

export const useNowPlaying = () => {
  const { data, isLoading, error } = useSWR('/api/now-playing', fetcher);

  return {
    nowPlaying: data,
    isLoadingNowPlaying: isLoading,
    errorNowPlaying: error,
  };
};

export const useRecentlyPlayed = () => {
  const { data, error } = useSWR('/api/recently-played', fetcher);

  return {
    recentlyPlayed: data || null,
    errorRecentlyPlayed: error,
  };
};

// Combined hook for convenience
export const useSpotify = () => {
  const { nowPlaying, isLoadingNowPlaying, errorNowPlaying } = useNowPlaying();
  const { recentlyPlayed, errorRecentlyPlayed } = useRecentlyPlayed();

  return {
    nowPlaying,
    recentlyPlayed,
    isLoading: isLoadingNowPlaying,
    error: errorNowPlaying || errorRecentlyPlayed,
  };
};
