export type Subprocess =
  | "Intake"
  | "Pre-Treatment"
  | "Desalination"
  | "Post-Treatment"
  | "Concentrate Management";

export type BasicImpactModel = {
  social: number;
  environmental: number;
  economic: number;
}

export type TechnologyImpactValues = {
  technologyCombinationValues: {
    [key in Subprocess]: BasicImpactModel;
  };
}

export type SubprocessButtonState = {
    [key in Subprocess]: {
      types: string[];
      button: string;
      currentType: string;
    };
}

export type SubprocessWithType = {
  subprocess: Subprocess;
  type: string;
}


export type ParentState = {
  setParentState(data: TechnologyImpactValues): any;
}


