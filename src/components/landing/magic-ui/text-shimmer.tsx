import { CSSProperties, FC, ReactNode } from "react"

import { cn } from "@/lib/utils"

interface TextShimmerProps {
  children: ReactNode
  className?: string
  shimmerWidth?: number
}

const TextShimmer: FC<TextShimmerProps> = ({
  children,
  className,
  shimmerWidth = 100,
}) => {
  return (
    <p
      style={
        {
          "--shimmer-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "mx-auto max-w-md text-neutral-600/50 dark:text-neutral-400/50",

        // Shimmer effect
        "animate-shimmer bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",

        // Shimmer gradient
        "bg-gradient-to-r from-background via-black via-50% to-background dark:from-background dark:via-white dark:to-background",

        className
      )}
    >
      {children}
    </p>
  )
}

export default TextShimmer
