"use client";

import { useEffect, useState, useCallback } from "react";
import { GET } from "@/scripts/api/apiClient";
import { Paged, Pagination } from "@/types/common/paged/Paged";
import { Board } from "@/app/api/service/board/Board";
import { dateTimeUtil } from "@/utils/date/dateTimeUtil";
import { Title } from "@/components/text/Title";
import { Table } from "@/components/container/Table";
import { Links } from "@/components/common/Links";
import { Flex } from "@/components/container/Flex";
import { Text } from "@/components/text/Text";
import { Container } from "@/components/container/Container";
import PaginationComponent from "@/components/common/Pagination";
import Loading from "@/components/animations/Loading";

const BoardPage = (): React.ReactNode => {
  const [boardList, setBoardList] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    pageSize: 10,
    currentPage: 1,
    currentItems: 0,
    totalPages: 1,
    totalItems: 0,
  });

  const fetchPosts = useCallback(
    async (page: number): Promise<void> => {
      setLoading(true);
      try {
        const { result, error } = await GET<Paged<Board>>(`/api/v0/board?page=${page}&size=${pagination.pageSize}`);

        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }

        if (result && result.data) {
          const pagedResponse = result.data;
          setBoardList(pagedResponse.contents);
          setPagination(pagedResponse.pagination);
        }
      } catch {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    },
    [pagination.currentPage]
  );

  useEffect(() => {
    fetchPosts(pagination.currentPage);
  }, [fetchPosts, pagination.currentPage]);

  const handlePageChange = (page: number): void => {
    if (page < 1 || page > pagination.totalPages) return;
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <>
      <Title.h2>게시판</Title.h2>
      <Container.xxxl>
        {loading ? (
          <Loading />
        ) : (
          <Flex.Vertical justify="between" align="between">
            <Flex.Horizontal justify="between">
              <Text.sm>총 {pagination.totalItems}개의 게시글</Text.sm>
              <Links.Button href="/board/write" size="sm">
                글쓰기
              </Links.Button>
            </Flex.Horizontal>
            <Table.table>
              <Table.head>
                <Table.tr>
                  <Table.th.xs>번호</Table.th.xs>
                  <Table.th.auto>제목</Table.th.auto>
                  <Table.th.md>작성자</Table.th.md>
                  <Table.th.lg>작성일</Table.th.lg>
                  <Table.th.sm>조회수</Table.th.sm>
                </Table.tr>
              </Table.head>
              <Table.body>
                {boardList.map((board) => (
                  <Table.tr key={board.id}>
                    <Table.td align="center">{board.id}</Table.td>
                    <Table.td>
                      <Links.Text href={`/board/${board.id}`}>{board.title}</Links.Text>
                    </Table.td>
                    <Table.td align="center">
                      {/* TODO: 작성자 메뉴 모달 */}
                      {board.user_id}
                    </Table.td>
                    <Table.td align="center">{dateTimeUtil.y4m2d2(board.created_at)}</Table.td>
                    <Table.td align="center">{board.view_count}</Table.td>
                  </Table.tr>
                ))}
              </Table.body>
            </Table.table>

            {/* 페이지네이션 */}
            <PaginationComponent pagination={pagination} onPageChange={handlePageChange} />
          </Flex.Vertical>
        )}
      </Container.xxxl>
    </>
  );
};

export default BoardPage;
