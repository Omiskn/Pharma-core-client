import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const onSubmit = (data: Parameters<typeof loginMutation.mutate>[0]) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4" dir="rtl">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">تسجيل الدخول</h1>
          <p className="text-muted-foreground">أدخل بياناتك للوصول إلى النظام</p>
        </div>

        <LoginForm
          onSubmit={onSubmit}
          isPending={loginMutation.isPending}
          error={loginMutation.error ? new Error(String(loginMutation.error)) : null}
        />
      </div>
    </div>
  );
}
