"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PATCH } from "@/scripts/api/apiClient"; // Axios 인스턴스에서 PATCH 메서드 가져오기
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuthStore";
import Link from "next/link";

const MyPageEdit = (): React.ReactNode => {
  const router = useRouter();
  const { userInfo } = useAuthStore();
  const [nickname, setNickname] = useState(userInfo?.nickname || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const { result, error } = await PATCH(`/api/v0/user/${userInfo?.sub}`, { nickname });

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
      <>
        <h2 className="text-2xl font-bold text-center">회원정보 수정</h2>
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <form className="flex flex-col gap-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                비밀번호
              </label>
              {/* 비밀번호 변경 버튼 */}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nickname">
                닉네임
              </label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="닉네임을 입력하세요"
                required
              />
            </div>
            <div className="h-4">{error && <p className="text-red-500 text-sm">{error}</p>}</div>

            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="bg-neutral-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-neutral-800 transition duration-200"
              >
                수정
              </button>
              <Link
                href="/mypage"
                className="bg-neutral-500 text-center text-white font-semibold px-4 py-2 rounded-md hover:bg-neutral-600 transition duration-200"
              >
                취소
              </Link>
            </div>
          </form>
        </div>
      </>
    </ProtectedRoute>
  );
};

export default MyPageEdit;
