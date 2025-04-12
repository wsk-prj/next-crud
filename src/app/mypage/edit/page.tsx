"use client";

import { useState } from "react";
import { PATCH } from "@/scripts/api/apiClient";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuthStore";
import { Title } from "@/components/text/Title";
import { Container } from "@/components/container/Container";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { Button } from "@/components/form/Button";
import { Links } from "@/components/common/Links";
import { useError } from "@/hooks/useError";

const MyPageEdit = (): React.ReactNode => {
  const router = useRouter();
  const { payload } = useAuthStore();
  const [nickname, setNickname] = useState(payload?.nickname || "");
  const { setError } = useError();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const { result, error } = await PATCH(`/api/v0/user/${payload?.sub}`, { nickname });

    if (error) {
      setError(error.message);
      return;
    }

    if (result != null) {
      alert("회원정보가 성공적으로 수정되었습니다.");
      router.push("/mypage");
    }
  };

  return (
    <>
      <Title.h2>회원정보 수정</Title.h2>
      <Container.md>
        <Form onSubmit={handleSubmit}>
          <Input.Text name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)}>
            닉네임
          </Input.Text>
          <Button.Primary>수정</Button.Primary>
          <Links.Text href="/mypage">취소</Links.Text>
        </Form>
      </Container.md>
    </>
  );
};

export default MyPageEdit;
