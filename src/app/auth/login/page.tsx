"use client";

import { Container } from "@/components/container/Container";
import { Title } from "@/components/text/Title";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/form/Button";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { Links } from "@/components/common/Links";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useError } from "@/hooks/useError";

const Login = (): React.ReactNode => {
  const router = useRouter();
  const { login } = useAuthStore();
  const { fetchUserProfile } = useUserProfile();
  const { setError } = useError();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (id.length < 4) {
      setError("아이디는 4자 이상이어야 합니다.");
      return;
    }
    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    try {
      await login(id, password);
      await fetchUserProfile();

      alert("로그인에 성공했습니다.");
      const redirectPath = sessionStorage.getItem("redirectAfterLogin");
      if (redirectPath) {
        sessionStorage.removeItem("redirectAfterLogin");
        router.push(redirectPath);
      } else {
        router.push("/");
      }
    } catch {
      setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
      return;
    }
  };

  return (
    <>
      <Title.h2>로그인</Title.h2>
      <Container.md>
        <Form onSubmit={handleSubmit}>
          <Input.Text name="id" value={id} onChange={(e) => setId(e.target.value)}>
            아이디
          </Input.Text>
          <Input.Password name="password" value={password} onChange={(e) => setPassword(e.target.value)}>
            비밀번호
          </Input.Password>
          <Button.Primary>로그인</Button.Primary>
          <Links.Text href="/auth/signup">회원가입</Links.Text>
        </Form>
      </Container.md>
    </>
  );
};

export default Login;
