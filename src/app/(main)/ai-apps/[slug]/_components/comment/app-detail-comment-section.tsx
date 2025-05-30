import {
  addAppComment,
  getAppComments,
} from "@/server/queries/supabase/comments/app_comments"
import { User } from "@supabase/supabase-js"

import { addAppCommentReturnType, App_Comments, Apps } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"
import { CommentFormButton } from "@/components/comment/comment-form-button"
import { CommentListFilter } from "@/components/comment/comment-list-filter"
import { CommentMobileDrawer } from "@/components/comment/comment-mobile-drawer"
import { ProgressiveBlur } from "@/components/shared/progressive-blur"

import AppDetailCommentList from "./app-detail-comment-list"

type CommentListProps = {
  user: User | null
  app_id: Apps["app_id"]
  c_order?: "asc" | "desc"
  orderBy?: keyof App_Comments
}

const AppDetailCommentSection = async ({
  user,
  app_id,
  c_order,
  orderBy,
}: CommentListProps) => {
  const { comments: appComments, error: getAllCommentsError } =
    await getAppComments(app_id, c_order, orderBy)

  // TODO: HANDLE NO COMMENTS AND ERROR
  if (getAllCommentsError) {
    console.error(getAllCommentsError)
    return (
      <section className="flex flex-col space-y-6 md:space-y-8 3xl:max-w-7xl">
        <div className="flex items-center space-x-4 max-sm:flex-col">
          <span className="font-medium tracking-wide">
            Error loading comments
          </span>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
        <CommentFormButton<addAppCommentReturnType>
          db_row_id={app_id}
          commentReplyService={addAppComment}
        />
      </section>
    )
  }

  if (!appComments || appComments.length === 0)
    return (
      <section className="flex flex-col space-y-6 md:space-y-8 3xl:max-w-7xl">
        <div className="flex items-center space-x-4">
          <span className="font-medium tracking-wide">0 Comments</span>
          <p className="text-muted-foreground">
            Be the first one to comment ...
          </p>
        </div>
        <CommentFormButton<addAppCommentReturnType>
          db_row_id={app_id}
          commentReplyService={addAppComment}
        />
      </section>
    )

  const commentsList =
    appComments?.map((comment) => ({
      ...comment,
      user_has_liked_comment: Array.isArray(comment.app_comment_likes)
        ? !!comment.app_comment_likes.find((like) => like.user_id === user?.id)
        : false,
      likes_count: Array.isArray(comment.app_comment_likes)
        ? comment.app_comment_likes.length
        : 0,
      user_has_commented_comment: Array.isArray(appComments)
        ? !!appComments.find(
            (reply) =>
              reply.parent_id === comment.comment_id &&
              reply.user_id === user?.id
          )
        : false,
    })) ?? []

  return (
    <section
      id="app-comments-section"
      className="flex w-full flex-col space-y-6 md:space-y-8"
      suppressHydrationWarning
    >
      {/* COMMENT SECTION HEADER */}
      <div className="flex w-full items-center space-x-4">
        <span className="font-medium tracking-wide">
          {appComments.length} Comments
        </span>

        <CommentListFilter c_order={c_order} orderBy={orderBy} />
      </div>

      <CommentFormButton<addAppCommentReturnType>
        db_row_id={app_id}
        commentReplyService={addAppComment}
      />

      {/* MOBILE DRAWER */}
      <div className="sm:hidden">
        <CommentMobileDrawer firstComment={commentsList[0]}>
          <AppDetailCommentList
            commentsList={commentsList}
            className="mb-6 w-full p-4"
          />
        </CommentMobileDrawer>
      </div>

      {/* DESKTOP COMMENT LIST*/}
      <div className="hidden w-full flex-col space-y-4 sm:flex">
        <ScrollArea
          className={cn(
            "relative h-fit pb-2",
            commentsList.length >= 5 && "h-[50rem] pb-2"
          )}
        >
          <AppDetailCommentList commentsList={commentsList} className="mb-14" />
          <ProgressiveBlur className="h-24" />
        </ScrollArea>
      </div>
    </section>
  )
}

export default AppDetailCommentSection
