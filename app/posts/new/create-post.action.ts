"use server";

import { z } from "zod";
import { action } from "@/lib/safe-action";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const createPostSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  content: z.string().min(1, "Le contenu est requis"),
});

export const createPost = action
  .schema(createPostSchema)
  .action(async ({ parsedInput }) => {
    try {
      await prisma.post.create({
        data: {
          title: parsedInput.title,
          content: parsedInput.content,
          authorId: 1,
        },
      });

      revalidatePath("/posts");
    } catch (error) {
      console.error("Erreur lors de la création du post:", error);
      return { error: "Une erreur est survenue lors de la création du post" };
    }
  });
