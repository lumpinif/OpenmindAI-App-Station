import { EditorView } from "@tiptap/pm/view"
import {
  CheckSquare,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  List,
  ListOrdered,
  MessageSquarePlus,
  Text,
  TextQuote,
  Youtube,
} from "lucide-react"
import {
  Command,
  createSuggestionItems,
  renderItems,
  SuggestionItem,
} from "novel/extensions"

import { Apps, Posts } from "@/types/db_tables"

interface SlashCommandProps {
  setOpenYoutubeLink: (open: boolean) => void
  uploadFn: (
    file: File,
    view: EditorView,
    pos: number,
    content_id: Apps["app_id"] | Posts["post_id"],
    user_id: Apps["submitted_by_user_id"] | Posts["post_author_id"]
  ) => void
  content_id: Apps["app_id"] | Posts["post_id"]
  user_id: Apps["submitted_by_user_id"] | Posts["post_author_id"]
}

export const suggestionItems = ({
  setOpenYoutubeLink,
  uploadFn,
  content_id,
  user_id,
}: SlashCommandProps): SuggestionItem[] =>
  createSuggestionItems([
    // {
    //   title: "Send Feedback",
    //   description: "Let us know how we can improve.",
    //   icon: <MessageSquarePlus size={18} />,
    //   command: ({ editor, range }) => {
    //     editor.chain().focus().deleteRange(range).run();
    //     window.open("/feedback", "_blank");
    //   },
    // },
    {
      title: "Text",
      description: "Just start typing with plain text.",
      searchTerms: ["p", "paragraph"],
      icon: <Text size={18} />,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode("paragraph", "paragraph")
          .run()
      },
    },
    {
      title: "To-do List",
      description: "Track tasks with a to-do list.",
      searchTerms: ["todo", "task", "list", "check", "checkbox"],
      icon: <CheckSquare size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run()
      },
    },
    {
      title: "Heading 1",
      description: "Big section heading.",
      searchTerms: ["title", "big", "large"],
      icon: <Heading1 size={18} />,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run()
      },
    },
    {
      title: "Heading 2",
      description: "Medium section heading.",
      searchTerms: ["subtitle", "medium"],
      icon: <Heading2 size={18} />,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run()
      },
    },
    {
      title: "Heading 3",
      description: "Small section heading.",
      searchTerms: ["subtitle", "small"],
      icon: <Heading3 size={18} />,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 3 })
          .run()
      },
    },
    {
      title: "Bullet List",
      description: "Create a simple bullet list.",
      searchTerms: ["unordered", "point"],
      icon: <List size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run()
      },
    },
    {
      title: "Numbered List",
      description: "Create a list with numbering.",
      searchTerms: ["ordered"],
      icon: <ListOrdered size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run()
      },
    },
    {
      title: "Quote",
      description: "Capture a quote.",
      searchTerms: ["blockquote"],
      icon: <TextQuote size={18} />,
      command: ({ editor, range }) =>
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode("paragraph", "paragraph")
          .toggleBlockquote()
          .run(),
    },
    {
      title: "Code",
      description: "Capture a code snippet.",
      searchTerms: ["codeblock"],
      icon: <Code size={18} />,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
      title: "Image",
      description: "Upload an image from your computer.",
      searchTerms: ["photo", "picture", "media"],
      icon: <ImageIcon size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run()
        // upload image
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        input.onchange = async () => {
          if (input.files?.length) {
            const file = input.files[0]
            const pos = editor.view.state.selection.from
            uploadFn(file, editor.view, pos, content_id, user_id)
          }
        }
        input.click()
      },
    },
    {
      title: "Youtube",
      description: "Embed a Youtube video.",
      searchTerms: ["video", "youtube", "embed"],
      icon: <Youtube size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run()
        setOpenYoutubeLink(true)
      },
    },
  ])

export const slashCommand = ({
  setOpenYoutubeLink,
  uploadFn,
  content_id,
  user_id,
}: SlashCommandProps) =>
  Command.configure({
    suggestion: {
      items: () =>
        suggestionItems({
          setOpenYoutubeLink,
          uploadFn,
          content_id: content_id,
          user_id: user_id,
        }),
      render: renderItems,
    },
  })
