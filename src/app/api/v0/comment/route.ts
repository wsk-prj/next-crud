import { withErrorHandler } from "@/app/api/_errorHandler";
import responseUtil from "@/app/api/_responseUtil";
import { commentService } from "@/app/api/service/comment/_commentService";
import { CommentRequest } from "@/app/api/service/comment/dto/request/CommentRequest";
import { CommentResponse } from "@/app/api/service/comment/dto/response/CommentResponse";
import { ApiResponse } from "@/types/api/ApiResponse";
import { Paged } from "@/types/common/paged/Paged";
import { NextRequest, NextResponse } from "next/server";
import { requestUtil } from "../../_requestUtil";

export const POST = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<ApiResponse<CommentResponse | null>>> => {
    const commentRequest: CommentRequest = await request.json();
    const payload = await requestUtil.getPayload();
    const user_id = Number(payload.sub);

    const insertedComment = await commentService.insertComment(commentRequest, user_id);

    return responseUtil.success({ data: insertedComment });
  }
);

export const GET = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<ApiResponse<Paged<CommentResponse> | null>>> => {
    const board_id = Number(requestUtil.getQueryParam(request, "board_id"));
    const page = Number(requestUtil.getQueryParam(request, "page", "1"));
    const size = Number(requestUtil.getQueryParam(request, "size", "10"));

    const pagedResponse: Paged<CommentResponse> = await commentService.findAllComments(board_id, page, size);
    return responseUtil.success({ data: pagedResponse });
  }
);
