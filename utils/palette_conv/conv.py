import argparse

# Arguments
parse = argparse.ArgumentParser(prog="Palette converter", description="Takes palette file and converts it to JSON")
parse.add_argument("-o", "--output", help="output filename", required=True)
parse.add_argument("filename", help="input filename in UTF-8")
args = parse.parse_args()

# Read from file
inf = open(args.filename, "r", encoding="utf-8")
lines = inf.read().split("\n")
inf.close()

if len(lines) == 0:
  print("No lines to read")
  exit()

# Convert
counter = 0
s = ""
for l in lines:
  if len(l) == 0 or l[0] != '#':
    continue
  words = l.split(" ")

  s += f'  {{"id": "{counter}", "name": "{words[1]}", "color": "{words[0]}"}},\n';
  counter += 1

print(f'Converted {counter + 1} colors to "{args.output}"')

# Write to output file
outS = f'[\n{s[:-2]}\n]\n'
outf = open(args.output, "w", encoding="utf-8")
outf.write(outS)
outf.close()