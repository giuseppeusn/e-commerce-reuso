import type { HTMLAttributes } from "react";
import { cn } from "./utils";

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "min-w-0 rounded-3xl border border-reuso-border bg-reuso-surface shadow-reuso-sm",
      className,
    )}
    {...props}
  />
);

export const CardHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-1.5 p-6 pb-3", className)} {...props} />
);

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h2" | "h3" | "h4";
};

export const CardTitle = ({
  as: Heading = "h3",
  className,
  ...props
}: CardTitleProps) => (
  <Heading
    className={cn("text-base font-semibold leading-6 text-reuso-text", className)}
    {...props}
  />
);

export const CardDescription = ({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm leading-5 text-reuso-muted", className)} {...props} />
);

export const CardContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 pt-2", className)} {...props} />
);

export const CardFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center justify-end gap-2 border-t border-reuso-border px-6 py-4",
      className,
    )}
    {...props}
  />
);

export default Card;
