"use client";

import { AuthRequest } from "@/app/api/service/auth/dto/request/AuthRequest";
import { Links } from "@/components/common/Links";
import { Container } from "@/components/container/Container";
import { Button } from "@/components/form/Button";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { Title } from "@/components/text/Title";
import { useError } from "@/hooks/useError";
import { POST } from "@/scripts/api/apiClient";
import { routes } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = (): React.ReactNode => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setError } = useError();

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
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (nickname.length < 2) {
      setError("닉네임은 2자 이상이어야 합니다.");
      return;
    }

    const { result, error } = await POST<AuthRequest>(routes.api.v0.auth.signup.uri(), {
      loginid: id,
      loginpw: password,
      nickname: nickname,
    } as AuthRequest);

    if (error) {
      setError(error.message);
      return;
    }

    if (result) {
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      router.push(routes.auth.login.uri());
    }
  };

  return (
    <>
      <Title.h2>회원가입</Title.h2>
      <Container.md>
        <Form onSubmit={handleSubmit}>
          <Input.Text name="id" value={id} onChange={(e) => setId(e.target.value)}>
            아이디
          </Input.Text>
          <Input.Password name="password" value={password} onChange={(e) => setPassword(e.target.value)}>
            비밀번호
          </Input.Password>
          <Input.Password
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          >
            비밀번호 확인
          </Input.Password>
          <Input.Text name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)}>
            닉네임
          </Input.Text>
          <Button.Primary>회원가입</Button.Primary>
          <Links.Text href={routes.auth.login.uri()}>로그인</Links.Text>
        </Form>
      </Container.md>
    </>
  );
};

export default Signup;
