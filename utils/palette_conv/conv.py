
f = open("wool.txt", "r", encoding="utf-8")

lines = f.read().split("\n")

counter = 0
for l in lines:
  if len(l) == 0 or l[0] == '/' or l[0] == ' ':
    continue
  words = l.split(" ")

  print(f'  {{"id": "{counter}", "name": "{words[0]}", "color": "{words[1]}"}},')
  counter += 1
