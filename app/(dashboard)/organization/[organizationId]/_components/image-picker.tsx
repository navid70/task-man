"use client";

import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
// import Image from "next/image";
import { defaultImages } from "@/constants/images-respond";
// import Link from "next/link";
import { Loader } from "@mantine/core";
import { createApi } from "unsplash-js";
import { IconCheck } from "@tabler/icons-react";
import { FormErrors } from "@/components/form/form-errors";

interface ImagePickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
  fetch: fetch,
});

export const ImagePicker = ({ id, errors }: ImagePickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.error("Failed to get images from Unsplash!");
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center ">
        <Loader className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative ">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
            className={cn(
              "cursor-pointer size-fit relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-100 cursor-auto"
            )}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            {/*<Image*/}
            {/*  fill*/}
            {/*  sizes="inherit"*/}
            {/*  src={image.urls.thumb}*/}
            {/*  alt="Unsplash Image"*/}
            {/*  className="object-cover rounded-md"*/}
            {/*/>*/}
            <img
              src={image.urls.thumb}
              alt="Unsplash Image"
              className="object-cover w-20 h-14 rounded-md"
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 h-full  w-full bg-black/30 flex items-center justify-center">
                <IconCheck className="size-4 text-white" />
              </div>
            )}
            {/*<Link*/}
            {/*  href={image.links.html}*/}
            {/*  target="_blank"*/}
            {/*  className="opacity-0 group-hover:opacity-100 absolute bottom-0 text-[8px] truncate text-white hover:underline p-1 bg-black/60 overflow-hidden"*/}
            {/*>*/}
            {/*  {image.user.name}*/}
            {/*</Link>*/}
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};
