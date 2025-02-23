// Global data structures

import { ImageColoriser } from "./components/image";
import { SceneDescriptor } from "./components/scene";

export class Config {        // Config contains different global data
  paletteDir: string;     // URL to directory with palette configs
  imageDir: string;       // Prefix to directory with images
  scenes: SceneDescriptor[]; // Array of scenes 
}

// Main workflow controller

export class Workflow {
  config: Config;
  curScene: SceneDescriptor | null;

  coloriser: ImageColoriser;
  
  constructor( config: Config ) {
    // Loading config
    this.config = config;
    if (!this.config.scenes || this.config.scenes.length == 0)
      throw new Error("now scene available");
    console.log(this.config);

    // Setup components
    this.coloriser = new ImageColoriser($("#image-container"), this.config.imageDir);
  }

  async load( id: number ) { // Load scene by ID
    const s = this.config.scenes.find(s => s.id == id);
    if (!s) {
      console.log(`ERROR: no scene with id ${id} was found`);
      return;
    }

    await this.coloriser.load(s.img, s.masks);

  }
}
