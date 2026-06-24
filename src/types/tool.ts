export interface ToolExample {
  name: string;
  input: string;
  /** Second input for diff-style tools */
  input2?: string;
}

export interface ToolHelpStep {
  title: string;
  description: string;
}

export interface ToolHelpItem {
  title: string;
  description: string;
}
