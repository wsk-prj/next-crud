"use client";

import { RegisterDTO } from "@/app/api/v0/user/route";
import { POST } from "@/scripts/api/apiClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await POST<RegisterDTO>("/api/v0/user", {
        loginid: id,
        loginpw: password,
      });

      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      router.push("/auth/login");
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
              id="id"
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

export default Signup;
