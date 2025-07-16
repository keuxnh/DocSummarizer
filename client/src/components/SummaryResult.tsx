import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Plus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import type { Summary } from "@shared/schema";

interface SummaryResultProps {
  summary: Summary;
  onNewSummary: () => void;
}

export function SummaryResult({ summary, onNewSummary }: SummaryResultProps) {
  const handleDownload = () => {
    const content = `# ${summary.title}\n\n**파일명:** ${summary.filename}\n**요약 모드:** ${summary.summaryMode === 'basic' ? '기본' : '상세'}\n**생성 시간:** ${new Date(summary.createdAt!).toLocaleString('ko-KR')}\n\n---\n\n${summary.summaryContent}`;
    
    // 파일 확장자 결정
    const fileExtension = summary.fileType === 'pdf' ? 'pdf' : 'hwp';
    const mimeType = summary.fileType === 'pdf' ? 'application/pdf' : 'application/x-hwp';
    
    // 텍스트 파일로 먼저 만들기 (실제 PDF/HWP 생성은 복잡하므로 텍스트 파일로 제공)
    const blob = new Blob([content], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${summary.title}_요약.${fileExtension === 'pdf' ? 'txt' : 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg">
        <div className="p-6 border-b border-[#30363d]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{summary.title}</h2>
                <p className="text-sm text-[#8b949e] flex items-center space-x-2">
                  <span>{summary.filename}</span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(new Date(summary.createdAt!), { 
                      addSuffix: true, 
                      locale: ko 
                    })}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={summary.summaryMode === 'basic' ? 'default' : 'secondary'} className="bg-[#238636] text-white">
                {summary.summaryMode === 'basic' ? '기본 요약' : '상세 요약'}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleDownload} className="border-[#30363d] text-[#f0f6fc] hover:bg-[#21262d] hover:text-[#f0f6fc]">
                <Download className="h-4 w-4 mr-2" />
                다운로드
              </Button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-[#f0f6fc]">
              {summary.summaryContent}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button onClick={onNewSummary} className="bg-[#238636] hover:bg-[#2ea043] text-white">
          <Plus className="h-4 w-4 mr-2" />
          새 요약 시작하기
        </Button>
      </div>
    </div>
  );
}
