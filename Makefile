default: build

run:
	@npx http-server ./dist

build:
	@node esbuild.js

pal:
	@py utils/palette_conv/conv.py -o dist/resources/palettes/sheep_skin.json utils/palette_conv/skin.pal
	@py utils/palette_conv/conv.py -o dist/resources/palettes/sheep_wool.json utils/palette_conv/wool.pal
	@py utils/palette_conv/conv.py -o dist/resources/palettes/viscose.json utils/palette_conv/viscose.pal
