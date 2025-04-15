import { Comment, CommentRequest } from "@/app/api/service/comment/Comment";
import { ExternalServiceError } from "@/types/api/error/InternalError";
import { supabase } from "../../lib/supabase/_supabaseClient";

export const commentRepository = {
  insertComment: async (comment: Comment): Promise<Comment> => {
    const { data, error } = await supabase.from("comment").insert(comment).select();
    if (error) {
      throw new ExternalServiceError(error.message);
    }
    return data[0];
  },
  findCommentById: async (id: number): Promise<Comment> => {
    const { data, error: fetchError } = await supabase.from("comment").select("*").eq("id", id).eq("is_deleted", false);
    if (fetchError) {
      throw new ExternalServiceError(fetchError.message);
    }
    return data[0];
  },
  findAllComments: async (board_id: number, page: number, size: number): Promise<Comment[]> => {
    const { data, error } = await supabase
      .from("comment")
      .select("*")
      .eq("board_id", board_id)
      .eq("is_deleted", false)
      .order("created_at", { ascending: false })
      .range((page - 1) * size, page * size - 1);
    if (error) {
      throw new ExternalServiceError(error.message);
    }
    return data.map((comment) => Comment.from(comment));
  },
  countAllComments: async (board_id: number): Promise<number> => {
    const { count, error } = await supabase
      .from("comment")
      .select("*", { count: "exact", head: true })
      .eq("board_id", board_id)
      .eq("is_deleted", false);

    if (error) {
      throw new ExternalServiceError(error.message);
    }

    return count || 0;
  },
  updateComment: async (id: number, comment: CommentRequest): Promise<number> => {
    const { data, error } = await supabase
      .from("comment")
      .update({ content: comment.content, updated_at: new Date() })
      .eq("id", id)
      .select();
    if (error) {
      throw new ExternalServiceError(error.message);
    }
    return data[0].id;
  },
  deleteComment: async (id: number): Promise<void> => {
    const { error } = await supabase.from("comment").update({ updated_at: new Date(), is_deleted: true }).eq("id", id);
    if (error) {
      throw new ExternalServiceError(error.message);
    }
  },
};
