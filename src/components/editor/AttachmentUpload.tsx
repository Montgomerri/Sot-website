"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";
import { uploadAttachment } from "@/services/storage/upload";


export default function AttachmentUpload({
  onUploadComplete,
}: {
  onUploadComplete: (urls:string[]) => void;
}) {


  const [files,setFiles] = useState<File[]>([]);
  const [uploading,setUploading] = useState(false);



  const onDrop = useCallback(async (acceptedFiles:File[])=>{


    setFiles(prev=>[
      ...prev,
      ...acceptedFiles
    ]);


    setUploading(true);


    try {

      const urls = await Promise.all(
        acceptedFiles.map(file =>
          uploadAttachment(file)
        )
      );


      onUploadComplete(urls);


    }
    finally{

      setUploading(false);

    }


  },[onUploadComplete]);



  const {
    getRootProps,
    getInputProps
  } = useDropzone({

    onDrop,

    accept:{
      "image/*":[],
      "application/pdf":[]
    },

    maxSize:10 * 1024 * 1024,

  });



  return (

    <div className="space-y-4">


      <div
        {...getRootProps()}
        className="cursor-pointer rounded-xl border-2 border-dashed p-8 text-center hover:border-blue-500 hover:bg-blue-50"
      >

        <input {...getInputProps()} />


        <UploadCloud
          className="mx-auto mb-3 text-gray-400"
          size={35}
        />


        <p>
          {uploading
          ? "Uploading..."
          : "Drag files here or click to upload"}
        </p>


        <p className="text-sm text-gray-500 mt-2">
          PNG JPG PDF up to 10MB
        </p>


      </div>



      {
        files.map((file,index)=>(

          <div
            key={index}
            className="flex justify-between rounded-lg border p-3 bg-gray-50"
          >

            <span>
              {file.name}
            </span>


            <X
              size={18}
              className="text-red-500"
            />

          </div>

        ))
      }


    </div>

  );

}