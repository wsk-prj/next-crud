import { Board } from "@/app/api/service/board/Board";
import { Paged } from "@/types/common/paged/Paged";
import { boardRepository } from "./_boardRepository";
import { BoardRequest } from "./dto/request/BoardRequest";
import { BoardResponse } from "./dto/response/BoardResponse";

export const boardService = {
  insertBoard: async (boardRequest: BoardRequest, user_id: number): Promise<BoardResponse> => {
    const board = Board.from({ ...boardRequest, user_id });
    const insertedBoard = await boardRepository.insertBoard(board);
    return BoardResponse.from(insertedBoard);
  },
  findBoardById: async (id: number, incrementViewCount: boolean): Promise<BoardResponse> => {
    if (incrementViewCount) {
      // TODO: 자기 게시글 조회수 증가 제외
      await boardRepository.incrementViewCount(id);
    }
    const foundBoard = await boardRepository.findBoardById(id);
    return BoardResponse.from(foundBoard);
  },
  findAllBoards: async (page: number, size: number): Promise<Paged<BoardResponse>> => {
    const foundBoards = await boardRepository.findAllBoards(page, size);
    const totalItems = await boardRepository.countAllBoards();

    const pagedResponse: Paged<BoardResponse> = {
      contents: foundBoards.map((board) => BoardResponse.from(board)),
      pagination: {
        pageSize: size,
        currentPage: page,
        currentItems: foundBoards.length,
        totalPages: Math.ceil(totalItems / size),
        totalItems: totalItems,
      },
    };
    return pagedResponse;
  },
  updateBoard: async (id: number, boardRequest: BoardRequest): Promise<Board> => {
    const board = Board.from({ ...boardRequest, id });
    // TODO: 게시글 작성자 확인
    return await boardRepository.updateBoard(id, board);
  },
  deleteBoard: async (id: number): Promise<void> => {
    // TODO: 게시글 작성자 확인
    await boardRepository.deleteBoard(id);
  },
};
