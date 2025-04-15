"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Links } from "@/components/common/Links";
import { Container } from "@/components/container/Container";
import { Button } from "@/components/form/Button";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { Title } from "@/components/text/Title";
import { useError } from "@/hooks/useError";
import { useUserProfile } from "@/hooks/useUserProfile";
import { PATCH } from "@/scripts/api/apiClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MyPageEdit = (): React.ReactNode => {
  const router = useRouter();
  const { userProfile } = useUserProfile();
  const [nickname, setNickname] = useState(userProfile?.nickname || "");
  const { setError } = useError();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const { result, error } = await PATCH(`/api/v0/user/${userProfile?.id}`, { nickname });

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
    <ProtectedRoute>
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
    </ProtectedRoute>
  );
};

export default MyPageEdit;
