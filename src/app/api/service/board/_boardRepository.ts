import { Board, BoardRequest } from "@/app/api/service/board/Board";
import { supabase } from "../../lib/supabase/_supabaseClient";
import { ExternalServiceError } from "@/types/api/error/InternalError";

export const boardRepository = {
  insertBoard: async (board: BoardRequest): Promise<number> => {
    const { data, error } = await supabase.from("board").insert(board).select();
    if (error) {
      throw new ExternalServiceError(error.message);
    }
    return data[0].id;
  },
  findBoardById: async (id: Board["id"]): Promise<Board> => {
    const { data, error: fetchError } = await supabase.from("board").select("*").eq("id", id).eq("is_deleted", false);
    if (fetchError) {
      throw new ExternalServiceError(fetchError.message);
    }

    const { error: incrementError } = await supabase
      .from("board")
      .update({ view_count: data[0].view_count + 1 })
      .eq("id", id);

    if (incrementError) {
      throw new ExternalServiceError(incrementError.message);
    }

    return data[0];
  },
  findAllBoards: async (page: number, size: number): Promise<Board[]> => {
    const { data, error } = await supabase
      .from("board")
      .select("*")
      .eq("is_deleted", false)
      .order("created_at", { ascending: false })
      .range((page - 1) * size, page * size - 1);
    if (error) {
      throw new ExternalServiceError(error.message);
    }
    return data;
  },
  countAllBoards: async (): Promise<number> => {
    const { count, error } = await supabase
      .from("board")
      .select("*", { count: "exact", head: true })
      .eq("is_deleted", false);

    if (error) {
      throw new ExternalServiceError(error.message);
    }

    return count || 0;
  },
  updateBoard: async (id: Board["id"], board: BoardRequest): Promise<number> => {
    const { data, error } = await supabase
      .from("board")
      .update({ title: board.title, content: board.content, updated_at: new Date() })
      .eq("id", id)
      .select();
    if (error) {
      throw new ExternalServiceError(error.message);
    }
    return data[0].id;
  },
  deleteBoard: async (id: Board["id"]): Promise<void> => {
    const { error } = await supabase.from("board").update({ updated_at: new Date(), is_deleted: true }).eq("id", id);
    if (error) {
      throw new ExternalServiceError(error.message);
    }
  },
};
