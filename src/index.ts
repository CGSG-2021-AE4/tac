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
          baseColor: "0xFFFFFF",
          palette: "sheep_skin",
        },
        {
          label: "Wool color",
          baseColor: "0xFFFFFF",
          palette: "sheep_wool",
        }
      ]
    },
    {
      id: 1,
      name: "test 1",
      img: "sheep/main.jpg",
      masks: [],
      colors: [],
    },
    {
      id: 1,
      name: "test 2",
      img: "sheep/main.jpg",
      masks: [],
      colors: [],
    },
    {
      id: 1,
      name: "test 3",
      img: "sheep/main.jpg",
      masks: [],
      colors: [],
    },
    {
      id: 1,
      name: "test 4",
      img: "sheep/main.jpg",
      masks: [],
      colors: [],
    },
    {
      id: 1,
      name: "test 5",
      img: "sheep/main.jpg",
      masks: [],
      colors: [],
    },
    {
      id: 1,
      name: "test 6",
      img: "sheep/main.jpg",
      masks: [],
      colors: [],
    },
    {
      id: 1,
      name: "test 7",
      img: "sheep/main.jpg",
      masks: [],
      colors: [],
    }
  ],
};

const wf = new Workflow(config);


wf.loadScene(0);

