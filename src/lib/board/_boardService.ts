import { BoardRequest, BoardResponse } from "@/app/api/v0/board/route";
import { boardRepository } from "./_boardRepository";
import { Board } from "./Board";
import { Paged } from "../common/paged/Paged";

export const boardService = {
  insertBoard: async (board: BoardRequest): Promise<number> => {
    const insertedBoardId = await boardRepository.insertBoard(board);
    return insertedBoardId;
  },
  findBoardById: async (id: Board["id"]): Promise<BoardResponse> => {
    const foundBoard = await boardRepository.findBoardById(id);
    return foundBoard;
  },
  findAllBoards: async (page: number, size: number): Promise<Paged<BoardResponse>> => {
    const foundBoards = await boardRepository.findAllBoards(page, size);
    const totalItems = await boardRepository.countAllBoards();

    const pagedResponse: Paged<BoardResponse> = {
      contents: foundBoards,
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
  updateBoard: async (id: Board["id"], board: BoardRequest): Promise<number> => {
    const updatedBoardId = await boardRepository.updateBoard(id, board);
    return updatedBoardId;
  },
  deleteBoard: async (id: Board["id"]): Promise<void> => {
    await boardRepository.deleteBoard(id);
  },
};
