import type { ActionError } from "astro:actions";

export const getFieldErrors = (
  error: ActionError | undefined,
): Record<string, string[]> => {
  if (error) {
    // @ts-ignore
    return error?.fields;
  }

  return {};
};
