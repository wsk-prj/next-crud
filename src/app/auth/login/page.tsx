"use client";

import useAuthStore from "@/hooks/useAuthStore";
import { LoginRequest, LoginResponse } from "@/lib/auth/_authService";
import { POST } from "@/scripts/api/apiClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const { login } = useAuthStore();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id.length < 4) {
      setError("아이디는 4자 이상이어야 합니다.");
      return;
    }
    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    const { result, error } = await POST<LoginRequest, LoginResponse>("/api/v0/auth/login", {
      loginid: id,
      loginpw: password,
    } as LoginRequest);

    if (error) {
      console.log(error);
      setError(error.message);
      return;
    }

    if (result) {
      alert("로그인에 성공했습니다.");
      login(result.data.token, result.data.payload);
      router.push("/");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center">로그인</h2>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="loginId">
              아이디
            </label>
            <input
              type="text"
              id="loginId"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <div className="h-4">{error && <p className="text-red-500 text-sm">{error}</p>}</div>
          <button
            type="submit"
            className="w-full bg-neutral-500 text-white font-semibold py-2 rounded-md hover:bg-neutral-600 transition duration-200"
          >
            로그인
          </button>
          <div className="text-center">
            <Link href="/auth/signup">회원가입</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
