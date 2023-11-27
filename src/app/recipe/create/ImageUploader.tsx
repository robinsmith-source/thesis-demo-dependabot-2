import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { UploadButton } from "~/utils/uploadthing";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useDropzone } from "@uploadthing/react/hooks";
import { useUploadThing } from "~/app/lib/uploadthing";
import { SetStateAction, useCallback, useState } from "react";
import { CardHeader } from "@nextui-org/card";

function UploadButton2() {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: SetStateAction<File[]>) => {
    setFiles(acceptedFiles);
  }, []);
  const { startUpload, permittedFileInfo } = useUploadThing(
    "recipeImagesUploader",
    {
      onClientUploadComplete: () => {
        //TODO: Change this to toast notifications
        alert("uploaded successfully!");
      },
      onUploadError: () => {
        alert("error occurred while uploading");
      },
      onUploadBegin: () => {
        alert("upload has begun");
      },
    },
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <Card>
      <CardHeader className="flex justify-center">Upload Images</CardHeader>
      <CardBody className="p-4">
        <div
          {...getRootProps()}
          className="rounded border-1 border-dashed border-black"
        >
          <input {...getInputProps()} />
          <div>
            {files.length > 0 && (
              <Button onClick={() => startUpload(files)}>
                Upload {files.length} files
              </Button>
            )}
          </div>
          Drop files here!
        </div>
      </CardBody>
    </Card>
  );
}
export default function ImageUploader() {
  const { control, watch, getValues } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "images",
  });

  console.log(watch());

  return (
    <div>
      {fields.map((image, index) => (
        <div>
          <Image
            key={image.id}
            src={`https://utfs.io/f/${getValues(`images.${index}`)}`}
          />
          <Button
            onClick={() => {
              remove(index);
            }}
          >
            Delete
          </Button>
        </div>
      ))}
      <UploadButton2 />
      <UploadButton
        endpoint="recipeImagesUploader"
        onClientUploadComplete={(res) => {
          res.forEach((file) => {
            console.log(file);
            append(file.key);
          });
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
