import { boardService } from "@/lib/board/_boardService";
import { Board } from "@/lib/board/Board";
import { User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "../../errorHandler";
import responseUtil from "@/utils/_responseUtil";
import { ApiResponse } from "@/types/ApiResponse";

export interface BoardRequest {
  user_id: User["id"];
  title: Board["title"];
  content: Board["content"];
}

export interface BoardResponse {
  id: Board["id"];
}

export const POST = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<ApiResponse<BoardResponse | null>>> => {
    const boardRequest: BoardRequest = await request.json();

    const board: Board = await boardService.insertBoard(boardRequest);

    return responseUtil.success({ data: board });
  }
);
