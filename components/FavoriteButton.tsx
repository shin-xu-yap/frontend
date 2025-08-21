"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Job } from "@/types/job";
import { IS_FAVORITE, ADD_FAVORITE, REMOVE_FAVORITE } from "@/lib/mutations/favoriteJob";

interface Props {
  job: Job;
  userId: number;
}

export default function FavoriteButton({ job, userId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch initial favorite state from backend
  const { data, loading } = useQuery(IS_FAVORITE, {
    variables: { userId, jobId: job.id },
  });

  useEffect(() => {
    if (data?.isFavorite !== undefined) {
      setIsFavorite(data.isFavorite);
    }
  }, [data]);

  const [addFavorite] = useMutation(ADD_FAVORITE, {
    onCompleted: () => setIsFavorite(true),
  });

  const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
    onCompleted: () => setIsFavorite(false),
  });

  const toggleFavorite = () => {
    const input = { userId, jobId: job.id };
    if (isFavorite) {
      removeFavorite({ variables: { input } });
    } else {
      addFavorite({ variables: { input } });
    }
  };

  if (loading) {
    return (
      <Button size="sm" variant="outline" disabled>
        Loading...
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      variant={isFavorite ? "destructive" : "default"}
      onClick={toggleFavorite}
    >
      {isFavorite ? "Unfavorite" : "Favorite"}
    </Button>
  );
}
