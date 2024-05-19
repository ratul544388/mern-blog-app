import { cn } from "../../lib/utils";

export const Modal = ({ open, title, description, children }) => {

  return (
    <div className={cn("hidden", open && "block")}>
      <div>
        <h1 className="">{title}</h1>
        <p>{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};
