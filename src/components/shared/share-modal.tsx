"use client"

import { ExternalLink } from "lucide-react"

import { cn } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"

import { Dialog } from "../ui/dialog"
import { Drawer } from "../ui/drawer"
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "../ui/responsive-modal"
import { CopyButton } from "./copy-button"
import { EnhancedDrawerClose } from "./enhanced-drawer"
import { SocialShare } from "./social-share"

type ShareModalProps = React.ComponentProps<typeof Dialog> &
  React.ComponentProps<typeof Drawer> & {
    url: string
    title: string
    slug?: string
    description?: string
    withTrigger?: boolean
    iconClassName?: string
    drawerCloseTitle?: string
    dialogDescription?: string
    children?: React.ReactNode
  }

export const ShareModal: React.FC<ShareModalProps> = ({
  url,
  title,
  slug,
  children,
  withTrigger,
  description,
  iconClassName,
  drawerCloseTitle,
  dialogDescription,
  ...props
}) => {
  const { isMobile } = useMediaQuery()

  return (
    <ResponsiveModal {...props}>
      <>
        {withTrigger === false || children ? (
          children
        ) : (
          <ResponsiveModalTrigger asChild>
            <button className="group">
              <ExternalLink
                className={cn(
                  "size-4 stroke-1 text-muted-foreground transition-all duration-150 ease-out group-hover:text-primary md:size-6",
                  iconClassName
                )}
              />
            </button>
          </ResponsiveModalTrigger>
        )}
      </>
      <ResponsiveModalContent className="w-full rounded-t-3xl p-4 py-6 md:p-8 lg:max-w-lg">
        <EnhancedDrawerClose title={drawerCloseTitle} className="lg:hidden" />
        <ResponsiveModalHeader className="hidden lg:block">
          <ResponsiveModalTitle>
            <h1 className="text-2xl font-semibold">Share</h1>
          </ResponsiveModalTitle>
          <ResponsiveModalDescription>
            <p className="text-muted-foreground">{dialogDescription}</p>
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <div className="flex w-full flex-col space-y-6 py-6 lg:space-y-10">
          <SocialShare
            url={url}
            description={description || ""}
            title={`AI App Station  |  ${title}`}
            className="flex w-full flex-wrap items-center justify-center gap-6"
          />
          <CopyButton
            url={url}
            isToast={false}
            className="rounded-full"
            // isToast={isMobile ? false : true}
          />
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  )
}
