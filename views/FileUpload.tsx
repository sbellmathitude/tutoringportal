
import React, { useState, useCallback } from 'react';
import { UploadIcon } from '../components/icons/IconComponents';
import { UPLOADED_FILES } from '../constants';
import type { UploadedFile } from '../types';
import DataTable from '../components/DataTable';

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(UPLOADED_FILES);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };
  
  const handleUpload = () => {
      const newFiles: UploadedFile[] = files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString().split('T')[0]
      }));
      setUploadedFiles(prev => [...newFiles, ...prev]);
      setFiles([]);
  };

  const columns = [
      { header: 'File Name', accessor: (row: UploadedFile) => row.name },
      { header: 'Size', accessor: (row: UploadedFile) => `${(row.size / 1024).toFixed(2)} KB` },
      { header: 'Upload Date', accessor: (row: UploadedFile) => row.uploadDate },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-neutral-dark">Upload Files</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="mx-auto h-12 w-12 text-gray-400">
                <UploadIcon />
            </div>
            <label htmlFor="file-upload" className="mt-4 block text-sm font-semibold text-brand-primary cursor-pointer">
                Choose files to upload
            </label>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
            <p className="mt-1 text-xs text-gray-500">PNG, JPG, PDF, DOCX up to 10MB</p>
        </div>
        
        {files.length > 0 && (
            <div className="mt-4">
                <h4 className="font-semibold text-gray-700">Selected files:</h4>
                <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
                    {files.map((file, index) => <li key={index}>{file.name}</li>)}
                </ul>
                <button 
                    onClick={handleUpload}
                    className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-brand-primary border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none">
                    Upload {files.length} file(s)
                </button>
            </div>
        )}
      </div>
       <DataTable title="Recently Uploaded Files" columns={columns} data={uploadedFiles} />
    </div>
  );
};

export default FileUpload;
