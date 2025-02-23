import { Config, Workflow } from "./controller";

const config: Config = {
  palettePrefix: "resources/palettes/",
  scenes: [
    {
      id: 0,
      name: "Sheep",
      img: "sheep/main.jpg",
      masks: ["sheep/wool_mask.jpg", "sheep/skin_mask.jpg"],
      colors: [
        {
          label: "Wool color",
          palette: "sheep_wool",
        },
        {
          label: "Skin color",
          palette: "sheep_skin",
        }
      ]
    }
  ],
};

const wf = new Workflow(config);

