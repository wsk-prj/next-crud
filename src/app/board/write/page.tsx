"use client";

import { Links } from "@/components/common/Links";
import { Container } from "@/components/container/Container";
import { Button } from "@/components/form/Button";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { Title } from "@/components/text/Title";
import { POST } from "@/scripts/api/apiClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProtectedRoute } from "../../../components/auth/ProtectedRoute";
import { BoardRequest } from "@/app/api/service/board/dto/request/BoardRequest";
import { BoardResponse } from "@/app/api/service/board/dto/response/BoardResponse";
import { routes } from "@/utils/routes";

const BoardWrite = (): React.ReactNode => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const { result, error } = await POST<BoardRequest, BoardResponse>(routes.api.v0.board.uri(), {
      title,
      content,
    });

    if (error) {
      console.error(error);
      return;
    }

    if (result) {
      alert("게시글이 성공적으로 작성되었습니다.");
      router.push(routes.board.resource.uri(result.data.id));
    }
  };

  return (
    <ProtectedRoute>
      <Title.h2>게시글 작성</Title.h2>
      <Container.xl>
        <Form onSubmit={handleSubmit}>
          <Input.Text name="title" value={title} onChange={(e) => setTitle(e.target.value)}>
            제목
          </Input.Text>
          <Input.Textarea name="content" value={content} onChange={(e) => setContent(e.target.value)}>
            내용
          </Input.Textarea>
          <Button.Primary>작성</Button.Primary>
          <Links.Text href={routes.board.uri()}>취소</Links.Text>
        </Form>
      </Container.xl>
    </ProtectedRoute>
  );
};

export default BoardWrite;
