// Main data structures

export class Color {
  id: number;
  name: string;
  color: string;
  contrastColor?: string; // Contrast color that is used for text 
}

export class Palette {
  name: string;
  colors: Color[];
}

export class ColorMenuDescriptor {
  label: string;     // Label for drop down menu
  baseColor: string; // Color of material on main image
  palette: string;   // Name of JSON file in palettes dir with array of ColorOption type
}

export class ColorMenu {
  // Local data
  public palette: Palette; // So I can check before fetching for palette name that is!! unique
  buttonText = "Выберете цвет";

  // JQuery elements
  container: JQuery<HTMLElement>;
  optionsContainer: JQuery<HTMLElement>;

  buttonElement: JQuery<HTMLInputElement>;
  optionElements: HTMLElement[] = [];
  activeOptionElement: JQuery<HTMLElement>;

  // Callbacks
  public onchange: ( c: Color ) => void;

  change( c: Color ) {
    this.buttonElement.text(c.name);
    this.buttonElement.css("background-color", c.color);
    this.buttonElement.css("color", c.contrastColor ? c.contrastColor : "var(--light)");
    if (!this.onchange) {
      alert("onchage is null");
      return;
    }
    this.onchange(c);
  }

  constructor( container: JQuery<HTMLElement> ) {
    this.container = container;
    container.addClass("color-menu");
    // this.options = options;

    // Create button
    this.buttonElement = $(`<button class="color-menu-button"/>`)
    this.buttonElement.on("click", () => {
      this.optionsContainer.toggleClass("hidden");
    });
    this.buttonElement.appendTo(this.container);

    // Create options container
    this.optionsContainer = $('<div class="color-menu-content hidden"></div>');
    this.optionsContainer.appendTo(this.container);

    // Create options
    document.addEventListener("click", ( e ) => {
      if (!e.target)
        return;
      if (!this.optionElements.includes(e.target as HTMLElement) && (e.target as HTMLElement) != this.buttonElement.get()[0])
        this.optionsContainer.addClass("hidden");
    });
  }

  // Setup functions

  loadPalette( p: Palette ) {
    this.palette = p;

    // Clear previous palette
    this.optionsContainer.html("");
    this.optionElements = [];
    
    p.colors.map( ( c: Color ) => {
      const nc = parseInt(c.color.replace(/^#/, ""), 16);

      // Calculating contrastColor
      c.contrastColor = "var(--light)";
      // Getting brightness
      const r = (nc >> 16) & 0xFF;
      const g = (nc >> 8) & 0xFF;
      const b = (nc >> 0) & 0xFF;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const br = (max + min) / 2;
      const lum = max - min;

      if (br > 130 && lum < 220)
        c.contrastColor = "var(--dark)";

      const optionE = $(`<div class="color-menu-option" style="background-color: ${c.color}; color: ${c.contrastColor}">${c.name}</div>`);
      optionE.on("click", () => {
        this.change(c);
        this.optionsContainer.addClass("hidden");
        if (this.activeOptionElement) {
          this.activeOptionElement.removeClass("active");
        }
        optionE.addClass("active");
        this.activeOptionElement = optionE;
      });

      this.optionElements.push(optionE.get()[0]);
      optionE.appendTo(this.optionsContainer);
    });

    // Setup button
    this.buttonElement.text(this.buttonText);
    this.buttonElement.css("background-color", "var(--light)");
    this.buttonElement.css("color", "var(--dark)");
  }
}
