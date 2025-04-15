"use client";

import { BoardRequest } from "@/app/api/service/board/dto/request/BoardRequest";
import { BoardResponse } from "@/app/api/service/board/dto/response/BoardResponse";
import Loading from "@/components/animations/Loading";
import { Links } from "@/components/common/Links";
import { Container } from "@/components/container/Container";
import { Button } from "@/components/form/Button";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { Title } from "@/components/text/Title";
import { useError } from "@/hooks/useError";
import { useUserProfile } from "@/hooks/useUserProfile";
import { GET, PATCH } from "@/scripts/api/apiClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "../../../../components/auth/ProtectedRoute";

const BoardEdit = ({ params }: { params: { id: string } }): React.ReactNode => {
  const router = useRouter();
  const { userProfile } = useUserProfile();
  const [board, setBoard] = useState<BoardResponse>();
  const { setError } = useError();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBoard = async (): Promise<void> => {
      const { result, error } = await GET<BoardResponse>(`/api/v0/board/${params.id}`);

      if (error) {
        setError(error.message);
      }
      if (result) {
        setBoard(result.data);
      }
    };
    fetchBoard();
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [board]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!userProfile?.id) {
      setError("로그인 후 이용해주세요.");
      return;
    }
    if (!board?.title) {
      setError("제목을 입력해주세요.");
      return;
    }
    if (!board?.content) {
      setError("내용을 입력해주세요.");
      return;
    }

    const { result, error } = await PATCH<BoardRequest, number>(`/api/v0/board/${params.id}`, {
      title: board.title,
      content: board.content,
    });

    if (error) {
      setError(error.message);
    }

    if (result) {
      alert("게시글이 수정되었습니다.");
      router.push(`/board/${result.data}`);
    }
  };

  return (
    <ProtectedRoute>
      <Title.h2>게시글 수정</Title.h2>
      <Container.xl>
        {isLoading || !board ? (
          <Loading />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Input.Text
              name="title"
              value={board.title}
              onChange={(e) => setBoard({ ...board, title: e.target.value })}
            >
              제목
            </Input.Text>
            <Input.Textarea
              name="content"
              value={board.content}
              onChange={(e) => setBoard({ ...board, content: e.target.value })}
            >
              내용
            </Input.Textarea>
            <Button.Primary>수정</Button.Primary>
            <Links.Text href={`/board/${params.id}`}>취소</Links.Text>
          </Form>
        )}
      </Container.xl>
    </ProtectedRoute>
  );
};

export default BoardEdit;
