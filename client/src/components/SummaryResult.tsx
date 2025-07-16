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
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${summary.title}_요약.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl">{summary.title}</CardTitle>
                <p className="text-sm text-muted-foreground flex items-center space-x-2">
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
              <Badge variant={summary.summaryMode === 'basic' ? 'default' : 'secondary'}>
                {summary.summaryMode === 'basic' ? '기본 요약' : '상세 요약'}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                다운로드
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {summary.summaryContent}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={onNewSummary} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          새 요약 시작하기
        </Button>
      </div>
    </div>
  );
}
