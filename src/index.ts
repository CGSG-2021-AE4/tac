import { Config, Workflow } from "./controller";

const config: Config = {
  paletteDir: "resources/palettes/",
  imageDir: "resources/images/",
  scenes: [
    {
      id: 0,
      name: "Sheep",
      img: "sheep/main.jpg",
      masks: ["sheep/skin_mask.jpg", "sheep/wool_mask.jpg"],
      colors: [
        {
          label: "Skin color",
          palette: "sheep_skin",
        },
        {
          label: "Wool color",
          palette: "sheep_wool",
        }
      ]
    }
  ],
};

const wf = new Workflow(config);


wf.load(0);

