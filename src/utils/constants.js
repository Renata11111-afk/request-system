export const ROLES = {
  USER: "user",
  MANAGER: "manager",
};

export const STATUS = {
  NEW: "new",
  IN_PROGRESS: "in-progress",
  DONE: "done",
};

export const FILTERS = [
  { label: "All", value: "all" },
  { label: "New", value: STATUS.NEW },
  { label: "In Progress", value: STATUS.IN_PROGRESS },
  { label: "Done", value: STATUS.DONE },
];