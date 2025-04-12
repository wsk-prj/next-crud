import { Flex } from "@/components/container/Flex";
import { Pagination } from "@/types/common/paged/Paged";
import { useEffect, useState } from "react";

type PaginationProps = {
  pagination: Pagination;
  onPageChange: (page: number) => void;
  pageSize?: 5 | 10;
};

const PaginationComponent: React.FC<PaginationProps> = ({ pagination, onPageChange, pageSize = 5 }) => {
  const totalPages = pagination.totalPages; // 총 페이지 수
  const currentPage = pagination.currentPage; // 현재 페이지
  const totalInternalPages = Math.ceil(totalPages / pageSize); // 페이지네이션 내부 총 페이지 수
  const [internalPage, setInternalPage] = useState(Math.ceil(currentPage / pageSize)); // 페이지네이션 내부 페이지

  useEffect(() => {
    renderButtons();
  }, [currentPage, pageSize]);

  const handleFirstPage = (): void => {
    onPageChange(1);
    setInternalPage(1);
  };
  const handlePrevOffset = (): void => {
    const newInternalPage = internalPage - 1;
    setInternalPage(newInternalPage);
    onPageChange(pageSize * (newInternalPage - 1) + 1);
  };
  const handleNextOffset = (): void => {
    const newInternalPage = internalPage + 1;
    setInternalPage(newInternalPage);
    onPageChange(pageSize * (newInternalPage - 1) + 1);
  };
  const handleLastPage = (): void => {
    onPageChange(totalPages);
    setInternalPage(totalInternalPages);
  };

  const renderButtons = (): React.ReactNode => {
    return (
      <>
        {renderFirstButton()}
        {renderPrevButton()}
        {renderPageButtons()}
        {renderNextButton()}
        {renderLastButton()}
      </>
    );
  };

  const renderFirstButton = (): React.ReactNode => {
    return (
      // 첫 페이지 버튼
      internalPage > 1 ? (
        <button
          id="page-first"
          key="page-first"
          onClick={handleFirstPage}
          className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-100"
        >
          &laquo;
        </button>
      ) : (
        <button
          id="empty-first"
          key="empty-first"
          className="px-3 py-1 border border-gray-300 rounded-l-md opacity-0 cursor-default"
          disabled
        >
          &laquo;
        </button>
      )
    );
  };

  const renderPrevButton = (): React.ReactNode => {
    // 이전 페이지 버튼
    return internalPage > 1 ? (
      <button
        id="page-prev"
        key="page-prev"
        onClick={handlePrevOffset}
        className="px-3 py-1 border border-gray-300 hover:bg-gray-100"
      >
        &lsaquo;
      </button>
    ) : (
      <button
        id="empty-prev"
        key="empty-prev"
        className="px-3 py-1 border border-gray-300 opacity-0 cursor-default"
        disabled
      >
        &lsaquo;
      </button>
    );
  };

  const renderPageButtons = (): React.ReactNode => {
    // 페이지 버튼
    const startPage = pageSize * (internalPage - 1) + 1;
    const endPage = Math.min(totalPages, pageSize * internalPage);
    const buttons = [];
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          id={`page-${i}`}
          key={`page-${i}`}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 border border-gray-300 ${
            i === currentPage ? "bg-blue-500 text-white" : "hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const renderNextButton = (): React.ReactNode => {
    // 다음 페이지 버튼
    return internalPage < totalInternalPages ? (
      <button
        id="page-next"
        key="page-next"
        onClick={handleNextOffset}
        className="px-3 py-1 border border-gray-300 hover:bg-gray-100"
      >
        &rsaquo;
      </button>
    ) : (
      <button
        id="empty-next"
        key="empty-next"
        className="px-3 py-1 border border-gray-300 opacity-0 cursor-default"
        disabled
      >
        &rsaquo;
      </button>
    );
  };

  const renderLastButton = (): React.ReactNode => {
    // 마지막 페이지 버튼
    return internalPage < totalInternalPages ? (
      <button
        id="page-last"
        key="page-last"
        onClick={handleLastPage}
        className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100"
      >
        &raquo;
      </button>
    ) : (
      <button
        id="empty-last"
        key="empty-last"
        className="px-3 py-1 border border-gray-300 rounded-r-md opacity-0 cursor-default"
        disabled
      >
        &raquo;
      </button>
    );
  };

  return (
    <Flex.Vertical justify="center" align="center">
      <Flex.Horizontal justify="center">{renderButtons()}</Flex.Horizontal>
    </Flex.Vertical>
  );
};

export default PaginationComponent;
