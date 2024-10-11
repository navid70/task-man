"use client";

import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";

import toast from "react-hot-toast";
// import { FormPicker } from "./form-picker";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";
import { Popover, PopoverDropdown, PopoverTarget, TextInput } from "@mantine/core";
import { ImagePicker } from "./image-picker";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/Button";
// import { useProModal } from "@/hooks/use-pro-modal";
// import { useMediaQuery } from "usehooks-ts";

interface CreateBoardPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
}

export const CreateBoardPopover = ({
                                     children,
                                     side = "bottom",
                                   }: CreateBoardPopoverProps) => {
  // const proModal = useProModal();
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:768px)");
  const { pending } = useFormStatus();
  console.log('out',pending);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created!");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
      // proModal.onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image });
  };

  if (!mounted) {
    return null;
  }
  return (
    <Popover key={'deck'} closeOnEscape={true} closeOnClickOutside={true} position={isMobile ? "bottom" : side}>
      <PopoverTarget>{children}</PopoverTarget>
      <PopoverDropdown>
        <div className="text-sm font-medium text-center my-4">
          Create Board
        </div>
        {/*<PopoverClose asChild ref={closeRef}>*/}
        {/*  <Button*/}
        {/*    variant={"ghost"}*/}
        {/*    className="h-auto w-auto p-1 absolute top-2 right-2 text-neutral-600"*/}
        {/*  >*/}
        {/*    <X className="h-4 w-4" />*/}
        {/*  </Button>*/}
        {/*</PopoverClose>*/}
        <form action={onSubmit} className="space-y-4 ">
            <ImagePicker id={"image"} errors={fieldErrors} />
            <TextInput
              id="title"
              name={"title"}
              label="Board Title"
              type="text"
              error={fieldErrors?.title}
            />
          <Button type={'submit'} className="w-full">Create</Button>
        </form>
      </PopoverDropdown>
    </Popover>
  );
};
