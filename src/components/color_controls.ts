import { Color, ColorMenu, ColorMenuDescriptor } from "./color_menu";
import { ImageColoriser } from "./image";

class ColorMenuLine {
  container: HTMLDivElement;
  labelElement: HTMLDivElement;
  menu: ColorMenu;
}

export class ColorControls {
  paletteDir: string;

  container: JQuery<HTMLDivElement>;

  coloriser: ImageColoriser;
  lines: ColorMenuLine[] = [];

  baseColors: number[] = [];
  curColors: number[] = [];

  constructor( container: JQuery<HTMLDivElement>, coloriser: ImageColoriser, paletteDir: string ) {
    this.container = container;
    this.coloriser = coloriser;
    this.paletteDir = paletteDir;
  }

  async load( d: ColorMenuDescriptor[] ) {
    // Create or hide needed amount of lines
    if (d.length > this.lines.length) {
      console.log(d, this.lines)
      const delta = d.length - this.lines.length;
      // Create more 
      for (var i = 0; i < delta; i++) {
        console.log("aa")
        const label = document.createElement("div");
        label.classList.add("color-menu-label");
        label.textContent = "label";
        const menuC = document.createElement("div");
 
        const c = document.createElement("div");
        c.classList.add("color-menu-line");
        $(c).append(label, menuC);
        this.lines.push({
          container: c,
          labelElement: label,
          menu: new ColorMenu($(menuC)),
        });
        this.container.append(c);
      }
    } else if (d.length < this.lines.length) {
      for (var i = 0; i < d.length; i++)
        this.lines[i].container.classList.remove("hidden");
      for (var i = d.length; i < this.lines.length; i++) 
        this.lines[i].container.classList.add("hidden");
    }
    
    // Setup every menu
    for (var i = 0; i < d.length; i++) {
      if (!this.lines[i].menu.palette || this.lines[i].menu.palette.name != d[i].palette) {
        // Fetch new palette
        const pal: Color[] = await $.getJSON(this.paletteDir + d[i].palette + ".json");
        this.lines[i].menu.loadPalette({
          name: d[i].palette,
          colors: pal,
        });
      }
    }
    
  }
}
