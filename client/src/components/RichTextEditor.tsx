import { useMemo, type FormEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

function RichTextEditor({
  content,
  handleContentChange,
  handleSubmit,
  loading,
}: {
  content: string;
  handleContentChange: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
      ],
    }),
    []
  );

  const formats = useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "list",
      "bullet",
      "link",
      "image",
    ],
    []
  );

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
      />

      {loading ? (
        <Button disabled>
          <Loader2 className="animate-spin" />
          Publishing post
        </Button>
      ) : (
        <Button className="cursor-pointer" type="submit">
          Publish
        </Button>
      )}
    </form>
  );
}

export default RichTextEditor;
