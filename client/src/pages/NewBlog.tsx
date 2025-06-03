import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/RichTextEditor";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { apiClient } from "@/utils/axios";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import useLoading from "@/hooks/useLoading";

function NewBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLoading();

    try {
      if (!content || content.trim() === "<p><br></p>") {
        toast.error("Content cannot be empty!");
        return;
      }

      const { data }: { data: { id: string } } = await apiClient.post(
        "/blog",
        {
          title,
          content,
          published: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Blog published successfully!");
      setTitle("");
      setContent("");
      navigate(`/blog/${data.id}`);
    } catch (err) {
      if (err instanceof AxiosError)
        toast.error(err.response?.data.message || err.message);
      else toast.error("Something went wrong! Please try again.");
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="mx-auto px-2 md:px-4 max-w-5xl mt-2 space-y-2.5 py-2">
      <Input
        className="border-y-0 border-r-0 border-l-2 shadow-none rounded-none focus-visible:ring-0 font-extrabold h-14 bg-slate-100 tracking-wider"
        onChange={handleTitleChange}
        style={{
          fontSize: "2rem",
        }}
        type="text"
        placeholder="Title"
        value={title}
      />
      <RichTextEditor
        content={content}
        handleContentChange={handleContentChange}
        handleSubmit={handleSubmit}
        loading={isLoading}
      ></RichTextEditor>
    </div>
  );
}

export default NewBlog;
