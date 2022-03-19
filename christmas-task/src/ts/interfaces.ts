interface IShape {
  bell: boolean;
  cone: boolean;
  sphere: boolean;
  figure: boolean;
  snowflake: boolean;
}

interface IColor {
  white: boolean;
  yellow: boolean;
  red: boolean;
  blue: boolean;
  green: boolean;
}

interface IRange {
  end: number;
  start: number;
}

interface ISize {
  big: boolean;
  medium: boolean;
  small: boolean;
}
interface IFilterOptions{
  amount: IRange;
  year: IRange;
  size: ISize;
  shape: IShape;
  favourite: number[];
  color: IColor;
  sortIndex: number;
  onlyFavorite: boolean;
}

type IOption = IRange | IShape | ISize | boolean;

interface IDataResponse {
  color: string;
  count: string;
  favorite: boolean;
  name: string;
  num: string;
  shape: string;
  size: string;
  year: string;
  onHide: (ind?: number) => HTMLElement;
  forHide: (item: IDataResponse) => HTMLElement | undefined;
}

interface ICallFilterParams {
  index: number;
  has: boolean;
  start: number;
  end: number;
  color: string;
  isFavourrite: boolean;
}

interface IToyPosInfo {
  left: number;
  top: number;
  toyNumber: number;
  toyID: number;
}

interface ICurrentTree {
  toys: IToyPosInfo[];
  treeNumber: number;
  bgNumber: number;
  id?: number;
}

export interface ICreateParams {
  textContent?: string;
  value?: string;
  className?: string;
  tag: string;
  id?: string;
  placeholder?: string;
  to?: number;
  from?: number;
  step?: number;
  name?: string;
  stateName?: string;
  href?: string;
  autofocus?: boolean;
  disabled?: boolean;
}

interface ISavedTrees {
  tree: ICurrentTree;
  toys: IDataResponse[];
  id: number;
}
interface IGameState {
  data: IDataResponse[];
  filteredData: IDataResponse[];
  filters: IFilterOptions;
  santaGame: boolean;
  audio: boolean;
  lastGerland: number;
  currentTree: ICurrentTree;
  savedTrees: ISavedTrees[];
}


export {IToyPosInfo, ICurrentTree,ISavedTrees, IShape, ISize, IRange, IFilterOptions, IDataResponse, IGameState, IOption, ICallFilterParams, IColor}