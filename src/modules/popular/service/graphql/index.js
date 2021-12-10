import { useMutation, useQuery } from '@apollo/client';
import { getPopular, unSubsrcibe } from './schema';

export const getPopularItems = () => useQuery(getPopular);
export const unSubscribeNews = () => useMutation(unSubsrcibe);
