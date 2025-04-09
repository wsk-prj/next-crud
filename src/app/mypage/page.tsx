import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const MyPage = (): React.ReactNode => {
  return (
    <ProtectedRoute>
      <div>MyPage</div>
    </ProtectedRoute>
  );
};

export default MyPage;
