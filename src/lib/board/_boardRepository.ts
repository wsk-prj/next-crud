import { Board } from "@/lib/board/Board";
import { supabase } from "../supabase/_supabaseClient";
import { ExternalServiceError } from "@/types/error/InternalError";
import { BoardRequest, BoardResponse } from "@/app/api/v0/board/route";

export const boardRepository = {
  insertBoard: async (board: BoardRequest): Promise<number> => {
    const { data, error } = await supabase.from("board").insert(board).select();
    if (error) {
      throw new ExternalServiceError(error.message);
    }
    return data[0].id;
  },
  findBoardById: async (id: Board["id"]): Promise<BoardResponse> => {
    const { data, error } = await supabase.from("board").select("*").eq("id", id).single();
    if (error) {
      throw new ExternalServiceError(error.message);
    }
    return data[0];
  },
  findAllBoards: async (page: number, size: number): Promise<BoardResponse[]> => {
    const { data, error } = await supabase
      .from("board")
      .select("*")
      .order("created_at", { ascending: false })
      .range((page - 1) * size, page * size - 1);

    if (error) {
      throw new ExternalServiceError(error.message);
    }
    return data;
  },
  countAllBoards: async (): Promise<number> => {
    const { data, error } = await supabase.from("board").select("*", { count: "exact" });
    if (error) {
      throw new ExternalServiceError(error.message);
    }
    return data[0].count;
  },
  updateBoard: async (id: Board["id"], board: BoardRequest): Promise<number> => {
    const { data, error } = await supabase.from("board").update(board).eq("id", id).select();
    if (error) {
      throw new ExternalServiceError(error.message);
    }
    return data[0].id;
  },
  deleteBoard: async (id: Board["id"]): Promise<void> => {
    const { error } = await supabase.from("board").delete().eq("id", id);
    if (error) {
      throw new ExternalServiceError(error.message);
    }
  },
};
