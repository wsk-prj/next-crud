import { Board } from "@/lib/board/Board";
import { supabase } from "../supabase/supabaseClient";
import { InternalServerError } from "@/types/error/InternalError";
import { BoardRequest } from "@/app/api/v0/board/route";

export const boardRepository = {
  insertBoard: async (board: BoardRequest) => {
    const { data, error } = await supabase.from("board").insert(board).select();
    if (error) {
      throw new InternalServerError(error.message);
    }
    return data[0];
  },
  findBoardById: async (id: Board["id"]) => {
    const { data, error } = await supabase.from("board").select("*").eq("id", id).single();
    if (error) {
      throw new InternalServerError(error.message);
    }
    return data[0];
  },
  findAllBoards: async () => {
    const { data, error } = await supabase.from("board").select("*");
    if (error) {
      throw new InternalServerError(error.message);
    }
    return data;
  },
  updateBoard: async (id: Board["id"], board: BoardRequest) => {
    const { data, error } = await supabase.from("board").update(board).eq("id", id).select();
    if (error) {
      throw new InternalServerError(error.message);
    }
    return data[0];
  },
  deleteBoard: async (id: Board["id"]) => {
    const { error } = await supabase.from("board").delete().eq("id", id);
    if (error) {
      throw new InternalServerError(error.message);
    }
  },
};
