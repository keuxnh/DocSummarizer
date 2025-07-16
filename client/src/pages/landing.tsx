import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, Brain, History, Github } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">DocSum</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleLogin} className="text-muted-foreground hover:text-foreground">
                로그인
              </Button>
              <Button onClick={handleLogin} className="bg-primary hover:bg-primary/90">
                회원가입
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              문서 요약을 <span className="text-primary">간편하게</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              HWP와 PDF 파일을 업로드하면 AI가 자동으로 요약해드립니다. 
              빠르고 정확한 문서 요약으로 시간을 절약하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleLogin} size="lg" className="bg-primary hover:bg-primary/90 text-lg">
                무료로 시작하기
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToFeatures} className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg">
                기능 살펴보기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">강력한 기능들</h2>
            <p className="text-xl text-muted-foreground">효율적인 문서 요약을 위한 모든 기능을 제공합니다</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">간편한 파일 업로드</h3>
                <p className="text-muted-foreground">HWP, PDF 파일을 드래그 앤 드롭으로 간편하게 업로드하세요</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">AI 기반 요약</h3>
                <p className="text-muted-foreground">최신 AI 기술로 정확하고 자연스러운 요약을 제공합니다</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <History className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">요약 기록 관리</h3>
                <p className="text-muted-foreground">모든 요약 내용을 안전하게 저장하고 언제든 다시 확인하세요</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">지금 시작해보세요</h2>
          <p className="text-xl text-gray-300 mb-8">무료로 가입하고 문서 요약의 편리함을 경험해보세요</p>
          <Button onClick={handleLogin} size="lg" className="bg-primary hover:bg-primary/90 text-lg">
            무료 회원가입
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">DocSum</span>
            </div>
            <p className="text-muted-foreground mb-6">AI 기반 문서 요약 서비스</p>
            <div className="text-sm text-muted-foreground">
              © 2024 DocSum. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
