import { Flex } from "@/components/container/Flex";
import { Pagination } from "@/lib/common/paged/Paged";

interface PaginationProps {
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ pagination, onPageChange }) => {
  const renderPaginationButtons = (): React.ReactNode => {
    const buttons = [];
    const maxButtons = 5; // 한 번에 표시할 페이지 버튼 수
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(pagination.totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // 첫 페이지 버튼
    if (startPage > 1) {
      buttons.push(
        <button
          key="first"
          onClick={() => onPageChange(1)}
          className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-100"
        >
          &laquo;
        </button>
      );
    }

    // 이전 페이지 버튼
    if (pagination.currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => onPageChange(pagination.currentPage - 1)}
          className="px-3 py-1 border border-gray-300 hover:bg-gray-100"
        >
          &lsaquo;
        </button>
      );
    }

    // 페이지 번호 버튼
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 border border-gray-300 ${
            i === pagination.currentPage ? "bg-blue-500 text-white" : "hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }

    // 다음 페이지 버튼
    if (pagination.currentPage < pagination.totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => onPageChange(pagination.currentPage + 1)}
          className="px-3 py-1 border border-gray-300 hover:bg-gray-100"
        >
          &rsaquo;
        </button>
      );
    }

    // 마지막 페이지 버튼
    if (endPage < pagination.totalPages) {
      buttons.push(
        <button
          key="last"
          onClick={() => onPageChange(pagination.totalPages)}
          className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100"
        >
          &raquo;
        </button>
      );
    }

    return buttons;
  };

  return (
    <Flex.Vertical justify="center" align="center">
      <Flex.Horizontal justify="center">{renderPaginationButtons()}</Flex.Horizontal>
    </Flex.Vertical>
  );
};

export default PaginationComponent;
