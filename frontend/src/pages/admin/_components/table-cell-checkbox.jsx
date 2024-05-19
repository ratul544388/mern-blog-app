import Checkbox from "../../../components/ui/checkbox";
import useCheckedIdsStore from "../../../hooks/use-checked-ids-store";

const TableCellCheckbox = ({ id }) => {
  const { checkedIds, onSingleCheck } = useCheckedIdsStore();

  const handleClick = () => {
    onSingleCheck(id);
  };

  return <Checkbox onClick={handleClick} checked={checkedIds.includes(id)} />;
};

export default TableCellCheckbox;
