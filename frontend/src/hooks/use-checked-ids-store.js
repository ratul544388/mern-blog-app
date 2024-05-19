import { create } from "zustand";

const useCheckedIdsStore = create((set) => ({
  checkedIds: [],
  onSingleCheck: (id) =>
    set(({ checkedIds }) => ({
      checkedIds: checkedIds.includes(id)
        ? checkedIds.filter((checkedId) => checkedId !== id)
        : [...checkedIds, id],
    })),
  onMultiCheck: (ids) =>
    set(() => ({
      checkedIds: ids,
    })),
  onResetCheckedIds: () =>
    set(() => ({
      checkedIds: [],
    })),
}));

export default useCheckedIdsStore;
