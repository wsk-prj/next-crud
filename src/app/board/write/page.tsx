"use client";

import { BoardRequest, BoardResponse } from "@/app/api/v0/board/route";
import { Links } from "@/components/common/Links";
import { Container } from "@/components/container/Container";
import { Button } from "@/components/form/Button";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { Title } from "@/components/text/Title";
import { useError } from "@/hooks/useError";
import { useUserProfile } from "@/hooks/useUserProfile";
import { POST } from "@/scripts/api/apiClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BoardWrite = (): React.ReactNode => {
  const router = useRouter();
  const { userProfile } = useUserProfile();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { setError } = useError();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!userProfile?.id) {
      setError("로그인 후 이용해주세요.");
      return;
    }

    const { result, error } = await POST<BoardRequest, BoardResponse>("/api/v0/board", {
      user_id: userProfile.id,
      title,
      content,
    });

    if (error) {
      console.error(error);
      return;
    }

    if (result) {
      alert("게시글이 성공적으로 작성되었습니다.");
      router.push("/board");
    }
  };

  return (
    <>
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
          <Links.Text href="/board">취소</Links.Text>
        </Form>
      </Container.xl>
    </>
  );
};

export default BoardWrite;
