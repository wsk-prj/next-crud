import { Board } from "@/app/api/service/board/Board";
import { Paged } from "@/types/common/paged/Paged";
import { boardRepository } from "./_boardRepository";
import { BoardRequest } from "./dto/request/BoardRequest";
import { BoardResponse } from "./dto/response/BoardResponse";

export const boardService = {
  insertBoard: async (board: Board): Promise<Board> => {
    return await boardRepository.insertBoard(board);
  },
  findBoardById: async (id: number, incrementViewCount: boolean): Promise<Board> => {
    if (incrementViewCount) {
      // TODO: 자기 게시글 조회수 증가 제외
      await boardRepository.incrementViewCount(id);
    }
    return await boardRepository.findBoardById(id);
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
    return await boardRepository.updateBoard(id, board);
  },
  deleteBoard: async (id: number): Promise<void> => {
    await boardRepository.deleteBoard(id);
  },
};
