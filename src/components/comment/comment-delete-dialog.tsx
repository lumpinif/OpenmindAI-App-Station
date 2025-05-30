import {
  CommentDeleteServiceType,
  TCommentRowId,
  TCommentWithProfile,
  TSetOptimisticComment,
} from "@/types/db_tables"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import CommentDeleteButton from "./comment-delete-button"

type CommentDeleteDialogProps<V extends (...args: any) => any> =
  React.ComponentPropsWithoutRef<typeof Dialog> & {
    isOpen: boolean
    db_row_id: TCommentRowId
    comment: TCommentWithProfile
    onOpenChange: (open: boolean) => void
    setOptimisitcComment: TSetOptimisticComment
    deleteCommentService: CommentDeleteServiceType<V>
  }

export const CommentDeleteDialog = <V extends (...args: any) => any>({
  isOpen,
  comment,
  db_row_id,
  onOpenChange,
  setOptimisitcComment,
  deleteCommentService,
  ...props
}: CommentDeleteDialogProps<V>) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} {...props}>
      <DialogContent className="rounded-lg shadow-outline backdrop-blur-xl max-sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            comment along with all replies.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-y-2 sm:flex-row sm:gap-y-0">
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Cancel
          </Button>
          <CommentDeleteButton<V>
            db_row_id={db_row_id}
            comment_id={comment.comment_id}
            variant="destructive"
            className="w-full sm:w-20"
            onDeleted={() => onOpenChange(false)}
            setOptimisitcComment={setOptimisitcComment}
            deleteCommentService={deleteCommentService}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
