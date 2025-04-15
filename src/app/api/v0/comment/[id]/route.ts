import { withErrorHandler } from "@/app/api/_errorHandler";
import responseUtil from "@/app/api/_responseUtil";
import { commentService } from "@/app/api/service/comment/_commentService";
import { CommentRequest } from "@/app/api/service/comment/dto/request/CommentRequest";
import { NextRequest } from "next/server";

export const PATCH = withErrorHandler(async (request: NextRequest, { params }: { params: { id: string } }) => {
  const id: number = Number(params.id);
  const commentRequest: CommentRequest = await request.json();

  await commentService.updateComment(id, commentRequest);

  return responseUtil.success();
});

export const DELETE = withErrorHandler(async (request: NextRequest, { params }: { params: { id: string } }) => {
  const id: number = Number(params.id);

  await commentService.deleteComment(id);

  return responseUtil.success();
});
