import Image from "next/image"

import { Posts } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"

type StoryContentHeroImageProps = {
  className?: string
  post_image_src: Posts["post_image_src"]
}

export const StoryContentHeroImage: React.FC<StoryContentHeroImageProps> = ({
  className,
  post_image_src,
}) => {
  if (!post_image_src || post_image_src === "") return null
  return (
    <div
      className={cn(
        "mx-auto my-5 mb-10 max-w-3xl animate-reveal 2xl:max-w-5xl",
        className
      )}
    >
      <AspectRatio ratio={16 / 9} className="relative">
        <Image
          fill
          sizes="100%"
          alt="Story Hero Image"
          src={post_image_src}
          className={cn(
            "relative rounded-2xl object-cover shadow-sm transition-all duration-150 ease-out"
          )}
        />
      </AspectRatio>
    </div>
  )
}
