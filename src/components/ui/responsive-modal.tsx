"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

import {
  EnhancedDrawer,
  EnhancedDrawerClose,
  EnhancedDrawerContent,
  EnhancedDrawerTrigger,
} from "../shared/enhanced-drawer"

interface BaseProps {
  children: React.ReactNode
}

export type RootResponsiveModalProps = BaseProps &
  React.ComponentProps<typeof Dialog> &
  React.ComponentProps<typeof Drawer> & {
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }

interface ResponsiveModalProps extends BaseProps {
  asChild?: true
  className?: string
}

// const desktop = "(min-width: 768px)"

const ResponsiveModal = ({ children, ...props }: RootResponsiveModalProps) => {
  const { isDesktop } = useMediaQuery()
  const ResponsiveModal = isDesktop ? Dialog : EnhancedDrawer

  return <ResponsiveModal {...props}>{children}</ResponsiveModal>
}

const ResponsiveModalTrigger = ({
  className,
  children,
  ...props
}: ResponsiveModalProps) => {
  const { isDesktop } = useMediaQuery()
  const ResponsiveModalTrigger = isDesktop
    ? DialogTrigger
    : EnhancedDrawerTrigger

  return (
    <ResponsiveModalTrigger className={className} {...props}>
      {children}
    </ResponsiveModalTrigger>
  )
}

const ResponsiveModalClose = ({
  className,
  children,
  ...props
}: ResponsiveModalProps) => {
  const { isDesktop, isMobile } = useMediaQuery()
  const ResponsiveModalClose = !isMobile ? DialogClose : EnhancedDrawerClose

  return (
    <ResponsiveModalClose className={className} {...props}>
      {children}
    </ResponsiveModalClose>
  )
}

const ResponsiveModalContent = ({
  className,
  children,
  ...props
}: ResponsiveModalProps) => {
  const { isDesktop } = useMediaQuery()
  const ResponsiveModalContent = isDesktop
    ? DialogContent
    : EnhancedDrawerContent

  return (
    <ResponsiveModalContent
      className={cn(
        "outline-none focus:!ring-0 focus:!ring-transparent",
        className
      )}
      {...props}
    >
      {children}
    </ResponsiveModalContent>
  )
}

const ResponsiveModalDescription = ({
  className,
  children,
  ...props
}: ResponsiveModalProps) => {
  const { isDesktop } = useMediaQuery()
  const ResponsiveModalDescription = isDesktop
    ? DialogDescription
    : DrawerDescription

  return (
    <ResponsiveModalDescription className={className} {...props}>
      {children}
    </ResponsiveModalDescription>
  )
}

const ResponsiveModalHeader = ({
  className,
  children,
  ...props
}: ResponsiveModalProps) => {
  const { isDesktop } = useMediaQuery()
  const ResponsiveModalHeader = isDesktop ? DialogHeader : DrawerHeader

  return (
    <ResponsiveModalHeader className={className} {...props}>
      {children}
    </ResponsiveModalHeader>
  )
}

const ResponsiveModalTitle = ({
  className,
  children,
  ...props
}: ResponsiveModalProps) => {
  const { isDesktop } = useMediaQuery()
  const ResponsiveModalTitle = isDesktop ? DialogTitle : DrawerTitle

  return (
    <ResponsiveModalTitle className={className} {...props}>
      {children}
    </ResponsiveModalTitle>
  )
}

const ResponsiveModalBody = ({
  className,
  children,
  ...props
}: ResponsiveModalProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  )
}

const ResponsiveModalFooter = ({
  className,
  children,
  ...props
}: ResponsiveModalProps) => {
  const { isDesktop } = useMediaQuery()
  const ResponsiveModalFooter = isDesktop ? DialogFooter : DrawerFooter

  return (
    <ResponsiveModalFooter className={className} {...props}>
      {children}
    </ResponsiveModalFooter>
  )
}

export {
  ResponsiveModal,
  ResponsiveModalBody,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
}
