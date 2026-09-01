import { useRef, useState } from "react";
import { uploadFile } from "../../../api/upload.api";
import "../application.css"

interface UploadBoxProps {
  enrollment: any;
  title: string;
  handleUrl: (url: string) => void;
}

function UploadBox({ title, handleUrl, enrollment }: UploadBoxProps) {
  const [file, setFile] = useState<File | { name: string }>({
    name: enrollment,
  });

  const [url, setUrl] = useState(enrollment);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];

      setFile(selectedFile);

      const cloudinaryResponse = await uploadFile(selectedFile);

      setUrl(cloudinaryResponse.secure_url);
      handleUrl(cloudinaryResponse.secure_url);
    }
  };

  return (
    <div className="upload-box" onClick={() => fileInputRef.current?.click()}>
      <div className="Upload-boxess-styling">
      <input
        hidden
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <h3>{title}</h3>

      <p>{file ? file.name : "Click to upload"}</p>
    </div>
    </div>
  );
}

export default UploadBox;
