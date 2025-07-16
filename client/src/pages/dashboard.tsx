import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, Menu, User, LogOut, Upload, Brain } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { FileUpload } from "@/components/FileUpload";
import { SummaryHistory } from "@/components/SummaryHistory";
import { SummaryResult } from "@/components/SummaryResult";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type { Summary } from "@shared/schema";

type DashboardView = 'upload' | 'summary' | 'loading';

export default function Dashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<DashboardView>('upload');
  const [selectedSummary, setSelectedSummary] = useState<Summary | null>(null);
  const [summaryMode, setSummaryMode] = useState<'basic' | 'detailed'>('basic');

  const {
    data: summaries,
    isLoading: summariesLoading,
    refetch: refetchSummaries,
  } = useQuery<Summary[]>({
    queryKey: ['/api/summaries'],
    retry: false,
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, authLoading, toast]);

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const handleNewSummary = () => {
    setCurrentView('upload');
    setSelectedSummary(null);
  };

  const handleSummaryCreated = (summary: Summary) => {
    setSelectedSummary(summary);
    setCurrentView('summary');
    refetchSummaries();
  };

  const handleLoadSummary = (summary: Summary) => {
    setSelectedSummary(summary);
    setCurrentView('summary');
    setSidebarOpen(false);
  };

  const handleUploadStart = () => {
    setCurrentView('loading');
  };

  const handleUploadError = (error: Error) => {
    setCurrentView('upload');
    if (isUnauthorizedError(error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
    toast({
      title: "업로드 실패",
      description: error.message,
      variant: "destructive",
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="w-12 h-12 rounded-lg mx-auto mb-4" />
          <Skeleton className="w-32 h-6 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Header */}
      <header className="bg-[#161b22] border-b border-[#30363d] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-[#f0f6fc] hover:bg-[#21262d]"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] rounded-full flex items-center justify-center">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-semibold text-white">DocSum</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-[#8b949e]">
                {user?.firstName || user?.email || "사용자"}님
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-[#f0f6fc] hover:bg-[#21262d]">
                <LogOut className="h-4 w-4 mr-2" />
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#161b22] border-r border-[#30363d] transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0`}>
          <div className="flex flex-col h-full pt-16">
            <div className="flex-1 px-4 py-6 overflow-y-auto pb-8">
              <div className="mb-6">
                <Button onClick={handleNewSummary} className="w-full bg-[#238636] hover:bg-[#2ea043] text-white border-0">
                  <Plus className="h-4 w-4 mr-2" />
                  새 요약
                </Button>
              </div>
              
              <SummaryHistory
                summaries={summaries || []}
                isLoading={summariesLoading}
                onSummarySelect={handleLoadSummary}
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-0 pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {currentView === 'upload' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2">문서 요약하기</h1>
                  <p className="text-[#8b949e]">HWP 또는 PDF 파일을 업로드하여 AI 요약을 받아보세요</p>
                </div>

                <FileUpload
                  onUploadStart={handleUploadStart}
                  onUploadSuccess={handleSummaryCreated}
                  onUploadError={handleUploadError}
                  summaryMode={summaryMode}
                />

                <div className="bg-[#161b22] border border-[#30363d] rounded-lg">
                  <div className="p-6 border-b border-[#30363d]">
                    <h3 className="text-lg font-semibold text-white">요약 옵션</h3>
                  </div>
                  <div className="p-6">
                    <RadioGroup value={summaryMode} onValueChange={(value) => setSummaryMode(value as 'basic' | 'detailed')}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="basic" id="basic" />
                        <Label htmlFor="basic" className="cursor-pointer">
                          <div>
                            <span className="font-medium text-white">기본 요약</span>
                            <p className="text-sm text-[#8b949e]">핵심 내용을 간단하게 요약합니다</p>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="detailed" id="detailed" />
                        <Label htmlFor="detailed" className="cursor-pointer">
                          <div>
                            <span className="font-medium text-white">상세 요약</span>
                            <p className="text-sm text-[#8b949e]">더 자세하고 포괄적인 요약을 제공합니다</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}

            {currentView === 'loading' && (
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg">
                <div className="p-12 text-center">
                  <div className="animate-spin w-12 h-12 border-4 border-[#7c3aed] border-t-transparent rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-white mb-2">파일 처리 중...</h3>
                  <p className="text-[#8b949e] mb-6">AI가 문서를 분석하고 요약하고 있습니다. 잠시만 기다려주세요.</p>
                  <div className="w-full bg-[#30363d] rounded-full h-2">
                    <div className="bg-[#7c3aed] h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            )}

            {currentView === 'summary' && selectedSummary && (
              <SummaryResult
                summary={selectedSummary}
                onNewSummary={handleNewSummary}
              />
            )}
          </div>
        </main>
      </div>

      {/* Sidebar backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
