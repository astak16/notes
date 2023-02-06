import React from "react";

const fileType: Record<string, string> = {
  ".pdf": "application/pdf",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".zip": "application/zip",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".rar": "application/x-rar-compressed",
} as const;

enum FileType {
  ".pdf" = "application/pdf",
  ".xls" = "application/vnd.ms-excel",
  ".xlsx" = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".zip" = "application/zip",
  ".doc" = "application/msword",
  ".docx" = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".ppt" = "application/vnd.ms-powerpoint",
  ".pptx" = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".rar" = "application/x-rar-compressed",
}

interface Props {
  api: string;
  host?: string;
  method: string;
  param: any;
  ext: FileType;
  filename: string;
}

const Download = (props: Props) => {
  const { api, host, method, param, ext, filename } = props;

  const fetchSource = async () => {
    const endpoint = host ? host + api : api;
    const response = await fetch(endpoint, {});
    if (response && response.body) {
      const reader = response.body.getReader();
      const contentLength = response.headers.values().next().value;
      let receivedLength = 0;
      const chunks: BlobPart[] = [];
      let percent = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        if (value) {
          chunks.push(value);
          receivedLength += value.length;
          percent = (receivedLength / contentLength) * 100;
          downloadProcess(percent);
        } else {
          console.log("没有拿到数据");
        }
      }
      console.log(percent);
      downloadSource(chunks);
    }
  };

  const downloadProcess = (percent: number) => {
    console.log(percent);
  };

  const downloadSource = (chunks: BlobPart[]) => {
    const a = window.document.createElement("a");
    const type = fileType[ext];
    const downloadUrl = window.URL.createObjectURL(new Blob(chunks, { type }));
    a.href = downloadUrl;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
  };
  const onClick = () => {
    fetchSource();
  };

  return <div onClick={onClick}>下载</div>;
};

export default Download;
