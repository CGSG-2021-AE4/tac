// Global data structures

import { ColorControls } from "./components/color_controls";
import { Color } from "./components/color_menu";
import { ImageColoriser } from "./components/coloriser";
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
  colorControls: ColorControls;

  // Callbacks
  onColorChange = ( newColors: Color[] ) => {
    console.log(newColors);

    // Extract colors
    const colorSet: number[] = [];
    newColors.map(c => {
      colorSet.push(parseInt(c.color.replace(/^#/, ""), 16))
    });

    // Update image
    this.coloriser.setColors(colorSet);
  }
  
  constructor( config: Config ) {
    // Loading config
    this.config = config;
    if (!this.config.scenes || this.config.scenes.length == 0)
      throw new Error("now scene available");
    console.log(this.config);

    // Setup components
    this.coloriser = new ImageColoriser($("#image-container"), this.config.imageDir);
    this.colorControls = new ColorControls($("#color-controls-container"), this.config.paletteDir);
    this.colorControls.onchange = this.onColorChange;
  }

  async load( id: number ) { // Load scene by ID
    const s = this.config.scenes.find(s => s.id == id);
    if (!s) {
      console.log(`ERROR: no scene with id ${id} was found`);
      return;
    }

    await this.coloriser.load(s.img, s.masks);
    console.log(this.coloriser);

    this.colorControls.load(s.colors);

    this.coloriser.setColors([0xFF0000, 0x00FF00]);
  }
}
