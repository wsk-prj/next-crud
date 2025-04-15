import { withErrorHandler } from "@/app/api/_errorHandler";
import { requestUtil } from "@/app/api/_requestUtil";
import ResponseUtil from "@/app/api/_responseUtil";
import { boardService } from "@/app/api/service/board/_boardService";
import { BoardRequest } from "@/app/api/service/board/dto/request/BoardRequest";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(async (request: NextRequest): Promise<NextResponse> => {
  const id: number = requestUtil.getResourceId(request);
  const incrementViewCount: boolean = requestUtil.getQueryParam(request, "incrementViewCount") === "true";

  const board = await boardService.findBoardById(id, incrementViewCount);

  return ResponseUtil.success({
    data: board,
  });
});

export const PATCH = withErrorHandler(async (request: NextRequest): Promise<NextResponse> => {
  const id: number = requestUtil.getResourceId(request);
  const boardRequest: BoardRequest = await request.json();

  const updatedBoardId = await boardService.updateBoard(id, boardRequest);

  return ResponseUtil.success({
    data: updatedBoardId,
  });
});

export const DELETE = withErrorHandler(async (request: NextRequest): Promise<NextResponse> => {
  const id: number = requestUtil.getResourceId(request);

  await boardService.deleteBoard(Number(id));

  return ResponseUtil.success();
});
