"use client";

import React, { useState } from "react";
import {
  Upload,
  FileImage,
  Brain,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface AnalysisResult {
  type: "text" | "image";
  data: string;
}

interface APIResponse {
  prediction?: string;
  error?: string;
}

type Props = {
  endPoint: string;
};

const BrainMRIUpload: React.FC<Props> = ({ endPoint }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setResult(null);
      setError(null);

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);
    setResult(null);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Make the API call
      const response = await fetch(
        `https://d874-34-125-104-193.ngrok-free.app/${endPoint}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON or image
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const jsonResult: APIResponse = await response.json();
        setResult({
          type: "text",
          data: jsonResult.prediction || jsonResult.error || "No result",
        });
      } else if (contentType && contentType.includes("image/")) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setResult({ type: "image", data: imageUrl });
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setUploading(false);
    }
  };

  const resetForm = (): void => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    // Reset file input
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <Brain className="mx-auto h-12 w-12 text-blue-600 mb-3" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Brain MRI Analysis
        </h2>
        <p className="text-gray-600">Upload a brain MRI image for analysis</p>
      </div>

      {/* File Upload Area */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="space-y-4">
            <img
              src={preview}
              alt="Preview"
              className="mx-auto max-h-48 rounded-lg shadow-md"
            />
            <div className="flex items-center justify-center space-x-2">
              <FileImage className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-700">
                {selectedFile?.name}
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-900">
                Drop your MRI image here
              </p>
              <p className="text-sm text-gray-500">or click to browse</p>
            </div>
          </div>
        )}

        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <button
          onClick={() => {
            const fileInput = document.getElementById(
              "file-input"
            ) as HTMLInputElement;
            fileInput?.click();
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Select Image
        </button>
      </div>

      {/* Action Buttons */}
      {selectedFile && (
        <div className="mt-6 flex space-x-3">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {uploading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-5 w-5 mr-2" />
                Analyze MRI
              </>
            )}
          </button>

          <button
            onClick={resetForm}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-3">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              Analysis Result
            </h3>
          </div>

          {result.type === "text" ? (
            <p className="text-gray-800 bg-white p-3 rounded border">
              {result.data}
            </p>
          ) : (
            <div className="bg-white p-3 rounded border">
              <p className="text-sm text-gray-600 mb-2">Processed Image:</p>
              <img
                src={result.data}
                alt="Analysis result"
                className="max-w-full h-auto rounded shadow-md"
              />
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-lg font-medium text-red-800">Error</h3>
          </div>
          <p className="text-red-700 mt-1">{error}</p>
        </div>
      )}

      {/* File Info */}
      <div className="mt-6 text-xs text-gray-500 text-center">
        <p>Supported formats: JPEG, PNG, BMP, TIFF</p>
        <p>
          Make sure your API endpoint is running on the same domain or configure
          CORS
        </p>
      </div>
    </div>
  );
};

export default BrainMRIUpload;
