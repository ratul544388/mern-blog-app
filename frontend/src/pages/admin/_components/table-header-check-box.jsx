import Checkbox from "../../../components/ui/checkbox";
import useCheckedIdsStore from "../../../hooks/use-checked-ids-store";

const TableHeaderCheckBox = ({ ids }) => {
  const { checkedIds, onMultiCheck, onResetCheckedIds } = useCheckedIdsStore();

  const handleClick = () => {
    const selectedIds = ids.filter((id) => checkedIds.includes(id));
    if (selectedIds.length !== ids.length) {
      onMultiCheck(ids);
    } else {
      onResetCheckedIds();
    }
  };

  const isChecked =
    checkedIds.length && ids.every((id) => checkedIds.includes(id));

  return <Checkbox checked={isChecked} onClick={handleClick} />;
};

export default TableHeaderCheckBox;
