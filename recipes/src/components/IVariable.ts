interface IVariable {
  varName: string;
  varType: string;
  varSize: string;
  varShape: string;
  varContent: string;
  isMatrix: boolean;
  isWidget: boolean;
  varColumns: string[];
  varColumnTypes: string[];
}

export default IVariable;
