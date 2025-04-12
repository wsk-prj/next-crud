import { ApiResponse } from "@/types/api/ApiResponse";
import ResponseUtil from "@/app/api/_responseUtil";
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/app/api/_errorHandler";
import { BoardRequest, BoardResponse } from "../route";
import { Board } from "@/app/api/service/board/Board";
import { boardService } from "@/app/api/service/board/_boardService";

export const GET = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<ApiResponse<BoardResponse | null>>> => {
    const { pathname } = request.nextUrl;
    const id: Board["id"] = Number(pathname.split("/").pop());

    if (!id) {
      return ResponseUtil.rejected({
        message: "잘못된 요청입니다.",
      });
    }

    const board = await boardService.findBoardById(Number(id));

    return ResponseUtil.success({
      data: board,
    });
  }
);

export const PATCH = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<ApiResponse<number | null>>> => {
    const { pathname } = request.nextUrl;
    const id: Board["id"] = Number(pathname.split("/").pop());
    const boardRequest: BoardRequest = await request.json();

    if (!id) {
      return ResponseUtil.rejected({
        message: "잘못된 요청입니다.",
      });
    }

    if (!boardRequest.title || !boardRequest.content) {
      return ResponseUtil.rejected({
        message: "제목과 내용을 입력해야 합니다.",
      });
    }

    const updatedBoardId = await boardService.updateBoard(Number(id), boardRequest);

    return ResponseUtil.success({
      data: updatedBoardId,
    });
  }
);

export const DELETE = withErrorHandler(async (request: NextRequest): Promise<NextResponse<ApiResponse>> => {
  const { pathname } = request.nextUrl;
  const id: Board["id"] = Number(pathname.split("/").pop());

  if (!id) {
    return ResponseUtil.rejected({
      message: "잘못된 요청입니다.",
    });
  }

  await boardService.deleteBoard(Number(id));

  return ResponseUtil.success();
});
