import { withErrorHandler } from "@/app/api/_errorHandler";
import { requestUtil } from "@/app/api/_requestUtil";
import responseUtil from "@/app/api/_responseUtil";
import { boardService } from "@/app/api/service/board/_boardService";
import { BoardRequest } from "@/app/api/service/board/dto/request/BoardRequest";
import { BoardResponse } from "@/app/api/service/board/dto/response/BoardResponse";
import { Paged } from "@/types/common/paged/Paged";
import { NextRequest, NextResponse } from "next/server";

export const POST = withErrorHandler(async (request: NextRequest): Promise<NextResponse> => {
  const boardRequest: BoardRequest = await request.json();
  const payload = await requestUtil.getPayload();
  const user_id = Number(payload.sub);

  const insertedBoard = await boardService.insertBoard(boardRequest, user_id);

  return responseUtil.success({ data: insertedBoard });
});

export const GET = withErrorHandler(async (request: NextRequest): Promise<NextResponse> => {
  const requestParams = await request.nextUrl.searchParams;
  const page = Number(requestParams.get("page") || "1");
  const size = Number(requestParams.get("size") || "10");

  const pagedResponse: Paged<BoardResponse> = await boardService.findAllBoards(page, size);
  return responseUtil.success({ data: pagedResponse });
});
