import IState from "@/types";

export default<IState> {
  showSidebar: true,
  loading: false,
  markdown: JSON.parse(sessionStorage.getItem('markdown') as string) || {},
  isEditDraft: false,
  haveSave: true,
  isSearch: false,
}