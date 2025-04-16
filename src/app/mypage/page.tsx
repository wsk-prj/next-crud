"use client";

import { Container } from "@/components/container/Container";
import { Button } from "@/components/form/Button";
import { Links } from "@/components/common/Links";
import { Text } from "@/components/text/Text";
import { Title } from "@/components/text/Title";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useUserProfile } from "@/hooks/useUserProfile";
import { DELETE } from "@/scripts/api/apiClient";
import { dateTimeUtil } from "@/utils/date/dateTimeUtil";
import { useRouter } from "next/navigation";
import { Box } from "@/components/container/Box";
import { Flex } from "@/components/container/Flex";
import Loading from "@/components/animations/Loading";
import { useError } from "@/hooks/useError";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { routes } from "@/utils/routes";

const MyPage = (): React.ReactNode => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { userProfile } = useUserProfile();
  const { setError } = useError();

  const handleWithdrawal = async (): Promise<void> => {
    const input = prompt("정말로 탈퇴하시겠습니까? 탈퇴 후 복구는 불가능합니다. 동의하시면 닉네임을 입력해주세요.");

    if (input == null) {
      return;
    }

    if (input !== userProfile?.nickname) {
      alert("닉네임이 일치하지 않습니다.");
      return;
    }

    const { result, error } = await DELETE(routes.api.v0.user.uri(userProfile?.id));

    if (error) {
      setError(error.message);
      return;
    }

    if (result != null) {
      alert("탈퇴가 완료되었습니다.");
      logout();
      router.push(routes.root);
    }
  };

  return (
    <ProtectedRoute>
      <Title.h2>마이페이지</Title.h2>
      <Container.lg>
        {!userProfile ? (
          <Loading />
        ) : (
          <>
            <Flex.Vertical>
              <Box.lg>
                <Flex.Vertical>
                  <div className="mb-2">
                    <Text.md>닉네임</Text.md>
                    <Text.md weight="semibold" align="right">
                      {userProfile.nickname}
                    </Text.md>
                  </div>
                  <div className="mb-2">
                    <Text.md>가입일</Text.md>
                    <Text.md weight="semibold" align="right">
                      {dateTimeUtil.y4m2d2(userProfile.created_at)}
                    </Text.md>
                  </div>
                  <div className="mb-2">
                    <Text.md>수정일</Text.md>
                    <Text.md weight="semibold" align="right">
                      {dateTimeUtil.y4m2d2(userProfile.updated_at)}
                    </Text.md>
                  </div>
                </Flex.Vertical>
              </Box.lg>
            </Flex.Vertical>
            <div className="mb-6"></div>
            <Flex.Horizontal justify="center">
              <div className="w-1/3">
                <Links.Button href={routes.mypage.edit.uri()}>!정보 수정</Links.Button>
              </div>
              <div className="w-1/3">
                <Button.Warn onClick={handleWithdrawal}>!회원 탈퇴</Button.Warn>
              </div>
            </Flex.Horizontal>
          </>
        )}
      </Container.lg>
    </ProtectedRoute>
  );
};

export default MyPage;
