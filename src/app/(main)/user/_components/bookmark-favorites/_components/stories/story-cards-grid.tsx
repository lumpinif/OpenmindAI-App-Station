import { getFavoritePosts } from "@/server/queries/supabase/favorites/data"
import { User } from "@supabase/supabase-js"

import { StoryCard } from "@/components/cards/apps/stories/story-card"

type StoryCardsGridProps = {
  user_id: User["id"]
  collectionType?: "favorite" | "bookmark"
}

export const StoryCardsGrid: React.FC<StoryCardsGridProps> = async ({
  user_id,
  collectionType,
}) => {
  const { favoritePosts, error: getFavoriteAppsError } = await getFavoritePosts(
    user_id,
    collectionType
  )

  if (getFavoriteAppsError) {
    return (
      <div className="text-destructive">
        Something went wrong: {getFavoriteAppsError}
      </div>
    )
  }

  if (!favoritePosts || favoritePosts.length === 0) {
    return (
      <div className="mt-6 text-muted-foreground">
        Add some stories to your favorite...
      </div>
    )
  }

  return (
    <div className="mt-6 grid auto-rows-max grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-8">
      {favoritePosts.map((favorite) => {
        if (!favorite) return null // Type guard to handle potential null values
        return (
          <StoryCard post={favorite} user_id={user_id} key={favorite.post_id} />
        )
      })}
    </div>
  )
}
