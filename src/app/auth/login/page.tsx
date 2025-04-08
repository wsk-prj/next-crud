"use client";

import { useState } from "react";
import api from "@/scripts/api/axiosConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthStore from "@/hooks/useAuthStore";

const Login = () => {
  const router = useRouter();
  const auth = useAuthStore();
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

    try {
      const response = await api.post("/api/v0/auth/login", {
        loginid: id,
        loginpw: password,
      });

      if (response.status === 200) {
        alert("로그인에 성공했습니다.");
        auth.setLoggedIn(true);
        router.push("/");
      } else {
        setError("로그인에 실패했습니다.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("로그인 중 알 수 없는 오류가 발생했습니다.");
      }
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
