import { Board } from "@/app/api/service/board/Board";
import { NotFoundError } from "@/types/api/error/BadRequest";
import { ExternalServiceError } from "@/types/api/error/InternalError";
import { supabase } from "../../lib/supabase/_supabaseClient";

const BOARD_TABLE_NAME = "board";
const BOARD_MESSAGE_NOT_FOUND = "게시글을 찾을 수 없습니다.";

export const boardRepository = {
  insertBoard: async (board: Board): Promise<Board> => {
    const { data, error } = await supabase.from(BOARD_TABLE_NAME).insert(board.serialize()).select();

    if (error) {
      throw new ExternalServiceError(error.message);
    }
    if (data.length === 0) {
      throw new NotFoundError(BOARD_MESSAGE_NOT_FOUND);
    }

    return Board.from(data[0]);
  },
  findBoardById: async (id: number): Promise<Board> => {
    const { data, error } = await supabase.from(BOARD_TABLE_NAME).select("*").eq("id", id).eq("is_deleted", false);

    if (error) {
      throw new ExternalServiceError(error.message);
    }
    if (data.length === 0) {
      throw new NotFoundError(BOARD_MESSAGE_NOT_FOUND);
    }

    return Board.from(data[0]);
  },
  incrementViewCount: async (id: number): Promise<void> => {
    const { data, error: fetchError } = await supabase
      .from(BOARD_TABLE_NAME)
      .select("*")
      .eq("id", id)
      .eq("is_deleted", false);

    if (fetchError) {
      throw new ExternalServiceError(fetchError.message);
    }
    if (data.length === 0) {
      throw new NotFoundError(BOARD_MESSAGE_NOT_FOUND);
    }

    const { error: incrementError } = await supabase
      .from(BOARD_TABLE_NAME)
      .update({ view_count: data[0].view_count + 1 })
      .eq("id", id);

    if (incrementError) {
      throw new ExternalServiceError(incrementError.message);
    }
  },
  findAllBoards: async (page: number, size: number): Promise<Board[]> => {
    const { data, error } = await supabase
      .from(BOARD_TABLE_NAME)
      .select("*")
      .eq("is_deleted", false)
      .order("created_at", { ascending: false })
      .range((page - 1) * size, page * size - 1);

    if (error) {
      throw new ExternalServiceError(error.message);
    }

    return data.map((board) => Board.from(board));
  },
  countAllBoards: async (): Promise<number> => {
    const { count, error } = await supabase
      .from(BOARD_TABLE_NAME)
      .select("*", { count: "exact", head: true })
      .eq("is_deleted", false);

    if (error) {
      throw new ExternalServiceError(error.message);
    }

    return count || 0;
  },
  updateBoard: async (id: number, board: Board): Promise<Board> => {
    const { data: dbBoard, error: fetchError } = await supabase
      .from(BOARD_TABLE_NAME)
      .select("*")
      .eq("id", id)
      .eq("is_deleted", false);

    if (fetchError) {
      throw new ExternalServiceError(fetchError.message);
    }
    if (dbBoard.length === 0) {
      throw new NotFoundError(BOARD_MESSAGE_NOT_FOUND);
    }

    const { data: updatedData, error: updateError } = await supabase
      .from(BOARD_TABLE_NAME)
      .update({ ...dbBoard[0], ...board.serialize(), updated_at: new Date() })
      .eq("id", id)
      .eq("is_deleted", false)
      .select();

    if (updateError) {
      throw new ExternalServiceError(updateError.message);
    }
    if (updatedData.length === 0) {
      throw new NotFoundError(BOARD_MESSAGE_NOT_FOUND);
    }

    return Board.from(updatedData[0]);
  },
  deleteBoard: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from(BOARD_TABLE_NAME)
      .update({ is_deleted: true, updated_at: new Date() })
      .eq("id", id);

    if (error) {
      throw new ExternalServiceError(error.message);
    }
  },
};
