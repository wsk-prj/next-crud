/* eslint-disable @typescript-eslint/no-explicit-any */
import { InternalServerError } from "@/types/api/error/InternalError";

type TransactionalOperation = {
  operation: () => Promise<any>;
  rollback: () => Promise<any>;
};

const operations: Array<() => Promise<any>> = [];
const rollbackOperations: Array<() => Promise<any>> = [];
let isExecuting = false;

export const transactionalService = {
  add: ({ operation, rollback }: TransactionalOperation): void => {
    if (isExecuting) {
      throw new InternalServerError("트랜잭션이 실행 중일 때는 작업을 추가할 수 없습니다.");
    }
    operations.push(operation);
    rollbackOperations.push(rollback);
  },
  excuteAll: async (): Promise<void> => {
    if (isExecuting) {
      throw new InternalServerError("트랜잭션이 이미 실행 중입니다.");
    }
    if (operations.length === 0) {
      throw new InternalServerError("실행할 작업이 없습니다.");
    }

    isExecuting = true;
    let lastCompletedIndex = -1;

    try {
      // 순차적으로 작업 실행
      for (let i = 0; i < operations.length; i++) {
        await operations[i]();
        lastCompletedIndex = i;
      }

      // 모든 작업이 성공적으로 완료되면 상태 초기화
      transactionalService.clearAll();
    } catch (error) {
      // 실행 중 오류 발생 시 롤백 수행
      console.error("[TransactionalService] 트랜잭션 실행 중 오류 발생:", error);
      if (lastCompletedIndex >= 0) {
        await transactionalService.rollbackAll(lastCompletedIndex);
      }

      throw error;
    } finally {
      isExecuting = false;
    }
  },
  rollbackAll: async (lastIndex = rollbackOperations.length - 1): Promise<void> => {
    // 역순으로 롤백 실행
    console.log(`[TransactionalService] ${lastIndex}번 인덱스부터 롤백 시작`);
    for (let i = lastIndex; i >= 0; i--) {
      try {
        console.log(`[TransactionalService] 롤백 실행 중: 인덱스 ${i}`);
        await rollbackOperations[i]();
        console.log(`[TransactionalService] 롤백 성공: 인덱스 ${i}`);
      } catch (rollbackError) {
        console.error(`[TransactionalService] 롤백 중 오류 발생: 인덱스 ${i}`, rollbackError);
      }
    }
    transactionalService.clearAll();
  },
  clearAll: (): void => {
    operations.length = 0;
    rollbackOperations.length = 0;
  },
};
