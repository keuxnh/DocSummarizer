import { Button } from "@/components/ui/button";
import { FileText, Github, Mail, Users, UserPlus } from "lucide-react";
import { Link } from "wouter";

export default function Signup() {
  const handleSignup = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">DocSum 회원가입</h1>
          <p className="text-[#8b949e]">AI 기반 문서 요약 서비스를 시작하세요</p>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
          <div className="space-y-4">
            <Button 
              onClick={handleSignup}
              className="w-full bg-[#238636] hover:bg-[#2ea043] text-white h-12 text-base font-medium"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Replit으로 시작하기
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#30363d]"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#161b22] px-2 text-[#8b949e]">또는</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className="border-[#30363d] text-[#f0f6fc] hover:bg-[#21262d] hover:text-[#f0f6fc] h-12"
                disabled
              >
                <Mail className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-[#30363d] text-[#f0f6fc] hover:bg-[#21262d] hover:text-[#f0f6fc] h-12"
                disabled
              >
                <span className="font-bold text-lg">G</span>
              </Button>
              <Button 
                variant="outline" 
                className="border-[#30363d] text-[#f0f6fc] hover:bg-[#21262d] hover:text-[#f0f6fc] h-12"
                disabled
              >
                <span className="font-bold text-lg">K</span>
              </Button>
            </div>

            <p className="text-xs text-[#8b949e] text-center">
              소셜 로그인은 현재 준비 중입니다.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#8b949e]">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-[#58a6ff] hover:underline">
              로그인
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[#58a6ff] hover:underline text-sm">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}