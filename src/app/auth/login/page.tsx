"use client";

import { useState } from "react";
import api from "@/scripts/api/axiosConfig";
import { redirect } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        loginId,
        password,
      });

      console.log(response.data);
      redirect("/");
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
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="loginId">
              아이디
            </label>
            <input
              type="text"
              id="loginId"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
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
