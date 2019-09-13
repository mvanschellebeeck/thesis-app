export type Subprocess =
  | 'Intake'
  | 'Pre-Treatment'
  | 'Desalination'
  | 'Post-Treatment'
  | 'Concentrate Management';

export interface BasicImpactModel {
  social: number;
  environmental: number;
  economic: number;
}

export interface TechnologyImpactValues {
  technologyCombinationValues: {
    [key in Subprocess]: BasicImpactModel;
  };
}

export type testType = {
    types: string[];
    button: string;
    currentType: string;
}

export type SubprocessButtonState = {
    [key in Subprocess]: testType
}

export interface SubprocessWithType {
  subprocess: Subprocess;
  type: string;
}

export interface TechnologyParentState {
  setParentState(data: TechnologyImpactValues): any;
}

export interface PlantSummary {
  title: string,
  description: string
}

export interface MapState {
  currentlySelectedPlant: PlantSummary
  plants: any;
}

export interface MapProps {
  current_plant: PlantSummary
  all_plants: any;
}

export interface PlantAPI {
  plants: any
}
