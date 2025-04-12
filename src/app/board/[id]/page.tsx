"use client";

import { BoardResponse } from "@/app/api/v0/board/route";
import { Container } from "@/components/container/Container";
import { Flex } from "@/components/container/Flex";
import { Title } from "@/components/text/Title";
import { useUserProfile } from "@/hooks/useUserProfile";
import { DELETE, GET } from "@/scripts/api/apiClient";
import { useEffect, useState } from "react";
import Line from "../../../components/common/Line";
import { Links } from "@/components/common/Links";
import Loading from "@/components/animations/Loading";
import { Button } from "@/components/form/Button";
import { useRouter } from "next/navigation";

export default function BoardIdPage({ params }: { params: { id: string } }): React.ReactNode {
  const router = useRouter();
  const { userProfile } = useUserProfile();
  const [board, setBoard] = useState<BoardResponse>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBoard = async (): Promise<void> => {
      const { result, error } = await GET<BoardResponse>(`/api/v0/board/${params.id}`);

      if (error) {
        console.error(error);
      }

      if (result && result.data) {
        setBoard(result.data);
      }
    };
    fetchBoard();
  }, []);

  useEffect(() => {
    setIsLoading(true);
  }, [board]);

  const handleDeleteAction = async (): Promise<void> => {
    if (confirm("게시글을 삭제하시겠습니까? 삭제 후 복구할 수 없습니다.")) {
      const { error } = await DELETE(`/api/v0/board/${params.id}`);

      if (error) {
        return;
      }

      alert("게시글이 삭제되었습니다.");
      router.push("/board");
    }
  };

  return (
    <>
      <Title.h2>게시판</Title.h2>
      <Container.xxxl>
        {!isLoading || !board ? (
          <Loading />
        ) : (
          <>
            <Flex.Vertical>
              <div className="w-full flex flex-row justify-between">
                <div className="w-5/6 flex flex-col justify-between">{board.title}</div>
                <Line.Vertical />
                <div className="w-1/6 flex flex-col justify-between items-center">{board.user_id}</div>
              </div>
              <Line.Horizontal />
              <Flex.Horizontal align="start">
                <div className="flex-1">{board.content}</div>
              </Flex.Horizontal>
              <Line.Horizontal />
              {userProfile?.id === board.user_id && (
                <div className="w-full flex flex-row justify-center gap-2">
                  <Links.Button href={`/board/${board.id}/edit`} color="secondary">
                    수정
                  </Links.Button>
                  <Button.Warn onClick={handleDeleteAction}>삭제</Button.Warn>
                </div>
              )}
              <div className="w-full flex flex-row justify-between"></div>
            </Flex.Vertical>
          </>
        )}
      </Container.xxxl>
    </>
  );
}
