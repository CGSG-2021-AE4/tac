// Global data structures

import { SceneDescriptor } from "./components/scene";

export class Config {        // Config contains different global data
  palettePrefix: string;     // URL to directory with palette configs
  scenes: SceneDescriptor[]; // Array of scenes 
}

