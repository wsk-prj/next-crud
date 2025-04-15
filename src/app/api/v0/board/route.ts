import responseUtil from "@/app/api/_responseUtil";
import { boardService } from "@/app/api/service/board/_boardService";
import { Paged } from "@/types/common/paged/Paged";
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "../../_errorHandler";
import { BoardRequest } from "../../service/board/dto/request/BoardRequest";
import { BoardResponse } from "../../service/board/dto/response/BoardResponse";
import { requestUtil } from "../../_requestUtil";
import { Board } from "../../service/board/Board";

export const POST = withErrorHandler(async (request: NextRequest): Promise<NextResponse> => {
  const boardRequest: BoardRequest = await request.json();
  const payload = await requestUtil.getPayload();

  const board = Board.from({ ...boardRequest, user_id: Number(payload.sub) });
  const insertedBoard = await boardService.insertBoard(board);

  return responseUtil.success({ data: insertedBoard });
});

export const GET = withErrorHandler(async (request: NextRequest): Promise<NextResponse> => {
  const requestParams = await request.nextUrl.searchParams;
  const page = Number(requestParams.get("page") || "1");
  const size = Number(requestParams.get("size") || "10");

  const pagedResponse: Paged<BoardResponse> = await boardService.findAllBoards(page, size);
  return responseUtil.success({ data: pagedResponse });
});
