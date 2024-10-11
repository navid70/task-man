"use client";

import { Button as MantineButton, ButtonProps, ElementProps } from "@mantine/core";
import { useFormStatus } from "react-dom";

interface ButtonType extends ButtonProps, ElementProps<'button', keyof ButtonProps> {
}

export const Button = ({ loading = false, ...props }: ButtonType) => {
  const { pending } = useFormStatus();

  return <MantineButton
    loading={props.type === "submit" ? pending || loading : loading}
    {...props}
  >
    {props.children}
  </MantineButton>;
};
