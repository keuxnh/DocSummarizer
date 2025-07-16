import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Summary } from "@shared/schema";

interface FileUploadProps {
  onUploadStart: () => void;
  onUploadSuccess: (summary: Summary) => void;
  onUploadError: (error: Error) => void;
  summaryMode: 'basic' | 'detailed';
}

export function FileUpload({ onUploadStart, onUploadSuccess, onUploadError, summaryMode }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (file.size > maxSize) {
      onUploadError(new Error("파일 크기가 10MB를 초과합니다."));
      return;
    }

    const allowedTypes = ['application/pdf'];
    const allowedExtensions = ['.pdf', '.hwp'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      onUploadError(new Error("지원되지 않는 파일 형식입니다. PDF 또는 HWP 파일만 업로드 가능합니다."));
      return;
    }

    setSelectedFile(file);
  }, [onUploadError]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      onUploadStart();

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('summaryMode', summaryMode);

      const response = await apiRequest('POST', '/api/summaries', formData);
      const summary = await response.json();

      onUploadSuccess(summary);
      setSelectedFile(null);
    } catch (error) {
      onUploadError(error instanceof Error ? error : new Error('업로드 중 오류가 발생했습니다.'));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Card className={`border-2 border-dashed transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary'}`}>
        <CardContent
          className="p-12 text-center cursor-pointer"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleSelectFile}
        >
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Upload className="h-6 w-6 text-primary-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {selectedFile ? selectedFile.name : "파일을 여기에 끌어다 놓으세요"}
          </h3>
          <p className="text-muted-foreground mb-4">
            {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)}MB` : "또는 클릭하여 파일을 선택하세요"}
          </p>
          {!selectedFile && (
            <Button type="button" variant="outline">
              파일 선택
            </Button>
          )}
          <p className="text-xs text-muted-foreground mt-4">지원 형식: HWP, PDF (최대 10MB)</p>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept=".hwp,.pdf"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {selectedFile && (
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)}MB
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setSelectedFile(null)}>
              취소
            </Button>
            <Button onClick={handleUpload}>
              요약 시작하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
