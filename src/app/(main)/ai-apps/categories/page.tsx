import { Metadata } from "next"


import AiAppsPagesTitle from "../_components/ai-apps-page-title"
import { CategoriesGrid } from "../_components/categories-grid"
import { getAllCategories } from "@/server/queries/supabase/categories"

export const metadata: Metadata = {
  title: "All Categories",
  description:
    "Useful AI Apps submitted by talented authors and creators like you. Updated, prospective and active.",
}

export default async function CategoriesPage() {
  const { categories: allCategories, error: getAllCategoiresError } =
    await getAllCategories()

  if (getAllCategoiresError) {
    console.error(getAllCategoiresError)
    return (
      <section className="flex flex-col gap-y-4">
        <AiAppsPagesTitle
          title={"No Categories found"}
          href={`/ai-apps/categories`}
        />
        <span className="text-muted-foreground">
          It should be fixed shortly
        </span>
        <p>Error: {getAllCategoiresError}</p>
      </section>
    )
  }

  if (!allCategories)
    return (
      <section className="flex flex-col gap-y-4">
        <AiAppsPagesTitle
          title={"No Categories found"}
          href={`/ai-apps/categories`}
        />
        <span className="text-muted-foreground">
          It should be fixed shortly
        </span>
      </section>
    )

  return (
    <section className="flex flex-col gap-y-4">
      <AiAppsPagesTitle title={"All Categories"} href={`/ai-apps/categories`} />

      <CategoriesGrid categoryItems={allCategories} />
    </section>
  )
}
