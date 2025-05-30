"use client"

import * as React from "react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Rating } from "@mui/material"
import { Star } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import {
  CommentActionsProp,
  CommentReplyServiceType,
  TCommentParentId,
  TCommentRowId,
} from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { useAutosizeTextArea } from "@/components/ui/autosize-textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"

import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"

const FormSchema = z.object({
  reply: z.string().max(2000, {
    message: "Reply must not be longer than 400 characters.",
  }),
  rating: z.number().min(0.5).max(5),
})

type CommentReplyFormProps<U extends (...args: any) => any> = Pick<
  CommentActionsProp,
  "setIsShowReplies"
> & {
  db_row_id: TCommentRowId
  parent_id?: TCommentParentId
  className?: string
  parent_name?: string
  withRating?: boolean
  toggleReplying: () => void
  commentReplyService: CommentReplyServiceType<U>
}

const CommentReplyForm = <U extends (...args: any) => any>({
  className,
  db_row_id,
  parent_name,
  toggleReplying,
  setIsShowReplies,
  withRating = false,
  commentReplyService,
  parent_id: replyToCommentId,
}: CommentReplyFormProps<U>) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rating: 4.5,
    },
  })
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)
  const [triggerAutoSize, setTriggerAutoSize] = React.useState("")
  useAutosizeTextArea({
    textAreaRef: textAreaRef?.current,
    triggerAutoSize: triggerAutoSize,
    minHeight: 30,
    maxHeight: 500,
  })

  /** You can use `form.watch` to trigger auto sizing. */
  const reply = form.watch("reply")
  React.useEffect(() => {
    if (textAreaRef.current) {
      setTriggerAutoSize(reply)
    }
  }, [reply])

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true)

    const rating = withRating ? values.rating : null

    const { comment, error } = await commentReplyService(
      db_row_id,
      values.reply,
      replyToCommentId,
      rating
    )

    if (comment) {
      setLoading(false)
      toggleReplying()
      form.reset()
      if (setIsShowReplies) setIsShowReplies(true)
    }

    if (error) {
      setLoading(false)
      toast.error(error)
      if (setIsShowReplies) setIsShowReplies(false)
    }

    router.refresh()
  }

  const handleCancelClick = () => {
    form.reset()
    toggleReplying()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
      >
        {withRating && (
          <>
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Rating
                          {...field}
                          value={field.value || 4.5}
                          onChange={(event, newValue) =>
                            field.onChange(newValue)
                          }
                          precision={0.5}
                          emptyIcon={<Star className=" fill-muted stroke-0" />}
                        />
                        <span className="text-xs font-medium text-muted-foreground dark:text-muted">
                          giving {field.value || 5} stars
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground dark:text-muted">
                        Tap a Star to Rate
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormMessage />
          </>
        )}
        <FormField
          control={form.control}
          name="reply"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">
                {parent_name ? `Replying to @ ${parent_name}: ` : ""}
              </FormLabel>
              <FormControl>
                <Textarea
                  className="no-scrollbar rounded-none border-l-0 border-r-0 border-t-0 bg-transparent ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Add a comment here ..."
                  {...field}
                  ref={textAreaRef}
                  // defaultValue={parent_name ? `@${parent_name}  ` : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-2">
          <LoadingButton loading={loading} type="submit">
            {withRating ? "Submit" : "Reply"}
          </LoadingButton>
          <Button type="reset" variant={"ghost"} onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default CommentReplyForm
