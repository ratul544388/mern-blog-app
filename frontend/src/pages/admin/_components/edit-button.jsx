import { Edit } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import useCheckedIdsStore from "../../../hooks/use-checked-ids-store";

const EditButton = ({ ids }) => {
  const { checkedIds } = useCheckedIdsStore();
  const { pathname } = useLocation();
  const href = `${pathname}/${checkedIds[0]}/edit`;

  const selectedIds = ids.filter((id) => checkedIds.includes(id));

  console.log(selectedIds);

  if (selectedIds.length !== 1) return null;

  return (
    <Link to={href} className={cn(buttonVariants({ variant: "outline" }))}>
      <Edit className="size-4" />
      Edit
    </Link>
  );
};

export default EditButton;
