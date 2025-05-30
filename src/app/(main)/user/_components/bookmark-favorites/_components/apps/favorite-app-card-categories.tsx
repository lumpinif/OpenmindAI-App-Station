import { Categories } from "@/types/db_tables"
import { Badge } from "@/components/ui/badge"
import { Category } from "@/app/(main)/ai-apps/[slug]/_components/app-detail-carousel"

type FavoriteAppCardCategoriesProps = {
  className?: string
  categories: Categories[]
}

export const FavoriteAppCardCategories: React.FC<
  FavoriteAppCardCategoriesProps
> = ({ className, categories }) => {
  return (
    <div className={className}>
      {categories && categories.length > 0 ? (
        categories?.map((category, index) => (
          <Badge
            key={category.category_id + index}
            variant={"outline"}
            className="border-border/40 hover:border-border/0 hover:bg-card hover:shadow-outline"
          >
            <Category
              key={category.category_id}
              category_slug={category.category_slug}
              category_name={category.category_name}
              category_icon_name={category.category_icon_name}
              category_icon_cn="size-4 md:size-4 md:stroke-1"
              className="flex items-center gap-x-2 font-light hover:no-underline"
            />
          </Badge>
        ))
      ) : (
        <Badge variant={"outline"} className="outline-border/20">
          <span className="flex h-full items-center justify-center text-center text-xs text-muted-foreground">
            No Categories yet
          </span>
        </Badge>
      )}
    </div>
  )
}
