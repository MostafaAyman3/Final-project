import FileUpload from "@/components/shared/FileUpload";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-53px)]">
      <FileUpload endPoint="brain-MRI" />
    </div>
  );
}
