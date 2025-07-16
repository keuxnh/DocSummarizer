import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import type { Summary } from "@shared/schema";

interface SummaryHistoryProps {
  summaries: Summary[];
  isLoading: boolean;
  onSummarySelect: (summary: Summary) => void;
}

export function SummaryHistory({ summaries, isLoading, onSummarySelect }: SummaryHistoryProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">요약 기록</h3>
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-3 rounded-lg">
              <div className="flex items-start space-x-3">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <div className="min-w-0 flex-1">
                  <Skeleton className="w-24 h-4 mb-1" />
                  <Skeleton className="w-16 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (summaries.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">요약 기록</h3>
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">아직 요약한 문서가 없습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">요약 기록</h3>
      <div className="space-y-2">
        {summaries.map((summary) => (
          <div
            key={summary.id}
            className="p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
            onClick={() => onSummarySelect(summary)}
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-muted-foreground/20 transition-colors">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate" title={summary.title}>
                  {summary.title}
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span className="capitalize">{summary.fileType}</span>
                  <span>•</span>
                  <span className="capitalize">{summary.summaryMode === 'basic' ? '기본' : '상세'}</span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(new Date(summary.createdAt!), { 
                      addSuffix: true, 
                      locale: ko 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
