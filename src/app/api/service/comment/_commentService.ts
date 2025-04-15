import { CommentRequest } from "@/app/api/service/comment/dto/request/CommentRequest";
import { CommentResponse } from "@/app/api/service/comment/dto/response/CommentResponse";
import { Paged } from "@/types/common/paged/Paged";
import { commentRepository } from "./_commentRepository";
import { Comment } from "./Comment";

export const commentService = {
  insertComment: async (commentRequest: CommentRequest, user_id: number): Promise<CommentResponse> => {
    const comment = Comment.from({ ...commentRequest, user_id });
    const insertedComment = await commentRepository.insertComment(comment);
    return CommentResponse.from(insertedComment);
  },
  findAllComments: async (board_id: number, page: number, size: number): Promise<Paged<CommentResponse>> => {
    const foundComments = await commentRepository.findAllComments(board_id, page, size);
    const totalItems = await commentRepository.countAllComments(board_id);

    const pagedResponse: Paged<CommentResponse> = {
      contents: foundComments.map((comment) => CommentResponse.from(comment)),
      pagination: {
        pageSize: size,
        currentPage: page,
        currentItems: foundComments.length,
        totalPages: Math.ceil(totalItems / size),
        totalItems: totalItems,
      },
    };
    return pagedResponse;
  },
  updateComment: async (id: number, commentRequest: CommentRequest): Promise<number> => {
    // TODO: 댓글 작성자 확인
    const comment = Comment.from({ ...commentRequest, id });
    return await commentRepository.updateComment(id, comment);
  },
  deleteComment: async (id: number): Promise<void> => {
    // TODO: 댓글 작성자 확인
    await commentRepository.deleteComment(id);
  },
};
