import { boardService } from "@/lib/board/_boardService";
import { Board } from "@/lib/board/Board";
import { User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "../../errorHandler";
import responseUtil from "@/utils/_responseUtil";
import { ApiResponse } from "@/types/ApiResponse";
import { Paged } from "@/lib/common/paged/Paged";

export interface BoardRequest {
  user_id: User["id"];
  title: Board["title"];
  content: Board["content"];
}

export interface BoardResponse {
  id: Board["id"];
  user_id: User["id"];
  title: Board["title"];
  content: Board["content"];
  created_at: Board["created_at"];
  updated_at: Board["updated_at"];
}

export const POST = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<ApiResponse<number | null>>> => {
    const boardRequest: BoardRequest = await request.json();

    const insertedBoardId = await boardService.insertBoard(boardRequest);

    return responseUtil.success({ data: insertedBoardId });
  }
);

export const GET = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<ApiResponse<Paged<BoardResponse> | null>>> => {
    const requestParams = await request.nextUrl.searchParams;
    const page = Number(requestParams.get("page") || "1");
    const size = Number(requestParams.get("size") || "10");

    const pagedResponse: Paged<BoardResponse> = await boardService.findAllBoards(page, size);

    return responseUtil.success({ data: pagedResponse });
  }
);
