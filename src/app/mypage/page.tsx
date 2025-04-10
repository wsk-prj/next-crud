"use client";

import { useAuthStore } from "@/hooks/useAuthStore";
import { useUserProfile } from "@/hooks/useUserProfile";
import { DELETE } from "@/scripts/api/apiClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyPage = (): React.ReactNode => {
  const router = useRouter();
  const { payload } = useAuthStore();
  const { logout } = useAuthStore();
  const { userProfile } = useUserProfile();
  const [error, setError] = useState<string | null>(null);

  const handleWithdrawal = async (): Promise<void> => {
    const input = prompt("정말로 탈퇴하시겠습니까? 탈퇴 후 복구는 불가능합니다. 동의하시면 닉네임을 입력해주세요.");

    if (input == null) {
      return;
    }

    if (input !== userProfile?.nickname) {
      alert("닉네임이 일치하지 않습니다.");
      return;
    }

    const { result, error } = await DELETE(`/api/v0/user/${payload?.sub}`);

    if (error) {
      setError(error.message);
      return;
    }

    if (result != null) {
      alert("탈퇴가 완료되었습니다.");
      logout();
      router.push("/");
    }
  };

  if (!userProfile) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center">마이페이지</h2>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <div className="flex flex-col gap-y-6">
          <div>
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">사용자 정보</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <div className="flex flex-col gap-y-2">
                <p className="text-gray-700">닉네임</p>
                <p className="text-end font-medium">{userProfile.nickname}</p>
                <p className="text-gray-700">가입일</p>
                <p className="text-end font-medium">{userProfile.created_at.toLocaleString()}</p>
                <p className="text-gray-700">수정일</p>
                <p className="text-end font-medium">{userProfile.updated_at.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Link
              href="/mypage/edit"
              className="bg-neutral-500 text-center text-white font-semibold py-2 px-4 rounded-md hover:bg-neutral-600 transition duration-200"
            >
              !정보 수정
            </Link>
            <button
              onClick={handleWithdrawal}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
            >
              !회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
