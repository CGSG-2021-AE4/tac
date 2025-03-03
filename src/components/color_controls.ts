import { Color, ColorMenu, ColorMenuDescriptor } from "./color_menu";

class ColorMenuLine {
  container: HTMLDivElement;
  labelElement: HTMLDivElement;
  menu: ColorMenu;
}

const WhiteColor: Color = {
  id: -1,
  name: "Default white",
  color: "#FFFFFF",
}

export class ColorControls {
  // Config data
  paletteDir: string;

  // Visual elements
  container: JQuery<HTMLDivElement>;

  // Components
  lines: ColorMenuLine[] = [];

  // Current state
  curColors: Color[] = [];

  // Callbacks
  public onchange: ( curColors: Color[] ) => void;

  constructor( container: JQuery<HTMLDivElement>, paletteDir: string ) {
    this.container = container;
    this.paletteDir = paletteDir;
  }

  async load( d: ColorMenuDescriptor[] ) {
    // Create or hide needed amount of lines
    if (d.length > this.lines.length) {
      const delta = d.length - this.lines.length;

      // Create more 
      for (var i = 0; i < delta; i++) {
        // Create html elements
        const label = document.createElement("div");
        label.classList.add("color-menu-label");
        label.textContent = "label";
        const menuC = document.createElement("div");
        const c = document.createElement("div");
        c.classList.add("color-menu-line");
        $(c).append(label, menuC);

        // Setup current colors
        this.curColors.push(structuredClone(WhiteColor));

        // Setup line
        const l: ColorMenuLine = {
          container: c,
          labelElement: label,
          menu: new ColorMenu($(menuC)),
        };
        const li = this.lines.length;
        l.menu.onchange = ( c: Color ) => {
          this.curColors[li] = c;
          this.onchange(this.curColors);
        }

        // Add it to others
        this.lines.push(l);
        this.container.append(c);
      }
    }

    for (var i = 0; i < d.length; i++) {
      this.lines[i].container.classList.remove("hidden");
      this.lines[i].menu.resetButton();
      this.curColors[i] = WhiteColor;
    }
    for (var i = d.length; i < this.lines.length; i++) 
      this.lines[i].container.classList.add("hidden");
    
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
      this.lines[i].labelElement.textContent = d[i].label;
    }
  }
}
