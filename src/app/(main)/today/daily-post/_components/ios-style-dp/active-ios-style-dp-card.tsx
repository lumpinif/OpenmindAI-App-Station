"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { useOnClickOutside } from "usehooks-ts"

import { DailyPost } from "@/types/db_tables"
import { AverageColor } from "@/lib/get-average-color-on-server"
import { cn } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ContentRenderer } from "@/components/editor/content-renderer"

import { DPCommentPreview } from "../dp-comment-preview"

type ActiveIosStyleDPCardProps = {
  color: AverageColor
  activeCard: DailyPost
  post_card_title: string
  setActiveCard: (dailyPost: DailyPost | null) => void
}

export const ActiveIosStyleDPCard: React.FC<ActiveIosStyleDPCardProps> = ({
  color,
  activeCard,
  setActiveCard,
  post_card_title,
}) => {
  const {
    posts: {
      post_id,
      profiles,
      post_title,
      post_content,
      post_image_src,
      post_description,
    },
    created_on,
  } = activeCard

  const currentPostDate = format(created_on, "EEEE MMMM dd")

  const { isMobile } = useMediaQuery()

  const ref = useRef(null)
  useOnClickOutside(ref, () => (!isMobile ? setActiveCard(null) : null))

  useEffect(() => {
    let originalOverflow = document.body.style.overflow
    let originalPaddingRight = document.body.style.paddingRight

    if (activeCard) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth
      originalOverflow = document.body.style.overflow
      originalPaddingRight = document.body.style.paddingRight
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${scrollBarWidth}px`
    } else {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [activeCard])

  return (
    <motion.div className="fixed inset-0 z-50 flex max-w-full items-end justify-center sm:items-center">
      <motion.div
        ref={ref}
        style={{
          borderRadius: 10,
        }}
        layoutId={`dp-card-${post_id}`}
        className="card card-active relative flex h-full w-full max-w-full transform-gpu flex-col overflow-hidden rounded-lg bg-background shadow-lg outline-none sm:h-[90vh] sm:max-w-xl md:max-w-2xl lg:max-w-3xl 2xl:max-w-4xl"
      >
        <ScrollArea className="h-full w-full" scrollHideDelay={0}>
          <div className="card-inner relative z-50 h-[430px] transform-gpu select-none md:h-[500px]">
            <motion.img
              layout="preserve-aspect"
              alt="daily AI news image"
              layoutId={`dp-card-image-${post_id}`}
              src={post_image_src || "/images/Feature-thumbnail.png"}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 0,
                objectFit: "cover",
                willChange: "transform",
              }}
              className="pointer-events-none z-50 h-full w-full bg-background object-cover"
            />
            <motion.button
              aria-label="Close button"
              onClick={() => setActiveCard(null)}
              layoutId={`dp-card-close-button-${post_id}`}
              className="close-button absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-[50%] bg-black/20 text-primary backdrop-blur-sm"
            >
              <X
                className={cn(
                  "size-4 sm:size-6",
                  color.isDark ? "text-white" : "text-zinc-900"
                )}
              />
            </motion.button>

            <motion.label
              layoutId={`dp-card-label-${post_id}`}
              className={cn(
                "absolute left-4 top-8 text-left text-lg font-semibold uppercase leading-[0.9]",
                color.isDark ? "text-white" : "text-zinc-900"
              )}
            >
              {currentPostDate}
            </motion.label>

            <motion.div
              layoutId={`dp-card-content-${post_id}`}
              className="card-content active-card-content absolute bottom-0 left-0 right-0"
              style={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <div className="card-text px-4 pb-3 pt-0">
                <motion.h2
                  layout
                  layoutId={`dp-card-heading-${post_id}`}
                  className={cn(
                    "card-heading leading- mb-1 max-w-44 text-left text-[40px] font-extrabold uppercase leading-[0.95] text-primary",
                    color.isDark ? "text-white" : "text-zinc-900"
                  )}
                >
                  {post_card_title}
                </motion.h2>
              </div>
              <motion.div
                layoutId={`dp-card-extra-info-${post_id}`}
                className="extra-info relative flex w-full items-center gap-2 bg-black/20 px-4 py-3 backdrop-blur-[2px]"
                style={{
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <motion.img
                  width={40}
                  height={40}
                  className="rounded-[8px]"
                  alt={`author-${profiles.full_name}-avatar`}
                  layoutId={`dp-card-author-avatar-${post_id}`}
                  src={profiles?.avatar_url || "@/images/Feature-thumbnail.png"}
                />

                <div className="desc-wrapper flex flex-col items-start">
                  <motion.span
                    layoutId={`dp-card-info-title-${post_id}`}
                    className={cn(
                      "line-clamp-1 text-[12px] font-semibold",
                      color.isDark ? "text-white" : "text-zinc-900"
                    )}
                  >
                    {profiles.full_name || profiles.email}
                  </motion.span>

                  <motion.span
                    layoutId={`dp-card-info-subtitle-${post_id}`}
                    className={cn(
                      "line-clamp-2 text-[12px] max-sm:max-w-[200px]",
                      color.isDark ? "text-white/80" : "text-zinc-900"
                    )}
                  >
                    {post_description}
                  </motion.span>
                </div>

                <motion.button
                  layout
                  layoutId={`dp-card-button-${post_id}`}
                  className={cn(
                    "get-button ml-auto rounded-full bg-muted/80 px-4 py-1 text-sm font-semibold text-blue-500 dark:text-blue-500"
                  )}
                >
                  <Link
                    className="text-nowrap"
                    href={`/today/daily-post/${created_on}`}
                  >
                    Go to the post
                  </Link>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="relative max-w-full px-2"
            layoutId={`dp-card-post-content-${post_id}`}
          >
            <ContentRenderer
              content={post_content}
              className="p-2 sm:p-4 md:p-6"
            />
          </motion.div>

          <div className="my-10 flex w-full items-center justify-center text-sm text-border">
            - end of the story -
          </div>

          <div className="p-2 pb-10 sm:p-4 md:p-6">
            <DPCommentPreview post_id={post_id} created_on={created_on} />
          </div>
        </ScrollArea>
      </motion.div>
    </motion.div>
  )
}
