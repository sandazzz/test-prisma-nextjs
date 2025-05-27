"use client";

import { useAction } from "next-safe-action/hooks";
import { createPost } from "./create-post.action";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const router = useRouter();
  const { execute } = useAction(createPost);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Créer un nouveau post</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await execute({
            title: formData.get("title") as string,
            content: formData.get("content") as string,
          });
          router.push("/posts");
        }}
        className="space-y-6"
      >
        <div>
          <label htmlFor="title" className="block text-lg mb-2">
            Titre
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your post title"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-lg mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your post content here..."
            rows={6}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
