import { BoardRequest } from "@/app/api/v0/board/route";
import { boardRepository } from "./_boardRepository";
import { Board } from "./Board";

export const boardService = {
  insertBoard: async (board: BoardRequest) => {
    const insertedBoard = await boardRepository.insertBoard(board);
    return insertedBoard;
  },
  findBoardById: async (id: Board["id"]) => {
    const board = await boardRepository.findBoardById(id);
    return board;
  },
  findAllBoards: async () => {
    const boards = await boardRepository.findAllBoards();
    return boards;
  },
  updateBoard: async (id: Board["id"], board: BoardRequest) => {
    const updatedBoard = await boardRepository.updateBoard(id, board);
    return updatedBoard;
  },
  deleteBoard: async (id: Board["id"]) => {
    await boardRepository.deleteBoard(id);
  },
};
