// Global data structures

import { ColorControls } from "./components/color_controls";
import { Color } from "./components/color_menu";
import { ImageColoriser } from "./components/coloriser";
import { SceneDescriptor } from "./components/scene_menu";
import { SceneMenu, SceneMenuOption } from "./components/scene_menu";

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
  sceneMenu: SceneMenu;

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

  onSceneChange = ( s: SceneMenuOption ) => {
    console.log("NEW SCENE");
    console.log(s);
    this.loadScene(s.id);
  }
  
  constructor( config: Config ) {
    // Loading config
    this.config = config;
    if (!this.config.scenes || this.config.scenes.length == 0)
      throw new Error("now scene available");
    console.log(this.config);

    // Setup components
    // Coloriser
    this.coloriser = new ImageColoriser($("#image-container"), this.config.imageDir);
    // Color controls
    this.colorControls = new ColorControls($("#color-controls-container"), this.config.paletteDir);
    this.colorControls.onchange = this.onColorChange;
    // Scene menu
    this.sceneMenu = new SceneMenu($("#scene-menu-container"));
    this.sceneMenu.onchange = this.onSceneChange;
    this.sceneMenu.loadConfig(this.config.scenes.map(function( s ): SceneMenuOption { return  { id: s.id, name: s.name, }; }));
  }

  async loadScene( id: number ) { // Load scene by ID
    const s = this.config.scenes.find(s => s.id == id);
    if (!s) {
      console.log(`ERROR: no scene with id ${id} was found`);
      return;
    }

    await this.coloriser.load(s.img, s.masks);
    console.log("Loaded coloriser");
    this.colorControls.load(s.colors);
    console.log("Loaded color controls")
  }
}
