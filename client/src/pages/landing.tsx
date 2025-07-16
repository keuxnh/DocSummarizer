import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, Brain, History, Github, Star, GitFork, ArrowRight } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Header */}
      <header className="bg-[#161b22] border-b border-[#30363d] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">DocSum</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleLogin} className="text-[#f0f6fc] hover:bg-[#21262d] hover:text-white border-0 rounded-md font-medium">
                로그인
              </Button>
              <Button onClick={handleLogin} className="bg-[#238636] hover:bg-[#2ea043] text-white border-0 rounded-md font-medium">
                시작하기
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-[#1f2937]/50 border border-[#374151] rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-[#fbbf24]" />
              <span className="text-sm text-[#9ca3af]">AI 기반 문서 요약 서비스</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] bg-clip-text text-transparent">
            문서 요약을 간편하게
          </h1>
          <p className="text-xl text-[#8b949e] mb-8 max-w-2xl mx-auto leading-relaxed">
            HWP와 PDF 파일을 업로드하면 AI가 자동으로 요약해드립니다. 
            빠르고 정확한 문서 요약으로 시간을 절약하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleLogin} size="lg" className="bg-[#238636] hover:bg-[#2ea043] text-white border-0 rounded-md font-medium text-lg px-8 py-3">
              무료로 시작하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/10 via-transparent to-[#3b82f6]/10 pointer-events-none"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0d1117] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">강력한 기능들</h2>
            <p className="text-xl text-[#8b949e]">효율적인 문서 요약을 위한 모든 기능을 제공합니다</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-8 hover:border-[#7c3aed]/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 text-center">간편한 파일 업로드</h3>
              <p className="text-[#8b949e] text-center">HWP, PDF 파일을 드래그 앤 드롭으로 간편하게 업로드하세요</p>
            </div>
            
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-8 hover:border-[#7c3aed]/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 text-center">AI 기반 요약</h3>
              <p className="text-[#8b949e] text-center">최신 AI 기술로 정확하고 자연스러운 요약을 제공합니다</p>
            </div>
            
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-8 hover:border-[#7c3aed]/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] rounded-lg flex items-center justify-center mx-auto mb-4">
                <History className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 text-center">요약 기록 관리</h3>
              <p className="text-[#8b949e] text-center">모든 요약 내용을 안전하게 저장하고 언제든 다시 확인하세요</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#161b22] border-t border-[#30363d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">지금 시작해보세요</h2>
          <p className="text-xl text-[#8b949e] mb-8">무료로 가입하고 문서 요약의 편리함을 경험해보세요</p>
          <Button onClick={handleLogin} size="lg" className="bg-[#238636] hover:bg-[#2ea043] text-white border-0 rounded-md font-medium text-lg px-8 py-3">
            무료 회원가입
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d1117] py-12 border-t border-[#30363d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">DocSum</span>
            </div>
            <p className="text-[#8b949e] mb-6">AI 기반 문서 요약 서비스</p>
            <div className="text-sm text-[#6e7681]">
              © 2024 DocSum. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
