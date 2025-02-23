// Main data structures

export class ColorOption {
  id: number;
  name: string;
  color: string;
}

export class ColorMenuDescriptor {
  label: string;   // Label for drop down menu
  palette: string; // Name of JSON file in palettes dir with array of ColorOption type
}
