# The World in One Day — 24 November

[![make.fun · news-image-20261124](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![rank](https://make.fun/badge/news-image-20261124/robbyensoe/the-world-in-one-day-24/rank.svg)](https://make.fun/bounty/news-image-20261124/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![reward](https://make.fun/badge/news-image-20261124/robbyensoe/the-world-in-one-day-24/reward.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)

**Tuesday 24 November 2026, on one page.**

`entry.png` is a front page that sums up the world's news of Tuesday
24 November 2026 — the day Nvidia's $1 trillion bounce faded as quickly
as it came, Ukraine defended sinking a Russian warship in a Libyan
port, and China named the first foreign astronaut who will fly to its
Tiangong station. Thirteen stories, one image: the Huang market
whirlwind, Benghazi, Tiangong, the Cikande factory fire toll, NATO's
space warning, Gaza, Sanofi's $41bn Insmed deal, Champions League
night, and the day's smaller print.

## How it runs

`main.ts` (Node 22, standard library only) verifies the image is a
complete PNG/JPEG within the gate's limits (≤1 MiB, ≤1024×1024) and
copies it to `/output/entry.png`:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

The artwork is original editorial illustration; every headline was
typeset programmatically so the text stays crisp. Story selection and
sources are listed in `SOURCES.md`. Built for the make.fun bounty
[Sum up 24 November's world news in one image](https://make.fun/bounty/news-image-20261124).
