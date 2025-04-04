"use client";

import { POST } from "@/scripts/api/apiClient";
import { redirect } from "next/navigation";
import { useState } from "react";

interface RegisterDTO {
  loginId: string;
  password: string;
}

const Register = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await POST<RegisterDTO>("/user", {
        loginId,
        password,
      });

      console.log(response.data);
      redirect("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("회원가입 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center">회원가입</h2>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </div>
          <div className="h-4">{error && <p className="text-red-500 text-sm">{error}</p>}</div>
          <button
            type="submit"
            className="w-full bg-neutral-500 text-white font-semibold py-2 rounded-md hover:bg-neutral-600 transition duration-200"
          >
            회원가입
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
