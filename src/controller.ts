// Global data structures

import { SceneDescriptor } from "./components/scene";

export class Config {        // Config contains different global data
  palettePrefix: string;     // URL to directory with palette configs
  scenes: SceneDescriptor[]; // Array of scenes 
}

// Main workflow controller

export class Workflow {
  config: Config;
  curScene: SceneDescriptor | null;
  
  constructor( config: Config ) {
    this.config = config;
    if (!this.config.scenes || this.config.scenes.length == 0)
      throw new Error("now scene available");

    console.log(this.config);
  }

  load( id: number ) { // Load scene by ID

  }
}
