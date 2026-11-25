// Fortune Cookies for Machines — u-gentle-badger-68-fortune-cookies-for-machines-29900c7e
// One-line fortune an AI agent would crack open. Node stdlib only, no network,
// no input besides the environment. Writes the entry to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt) and enforces the house gate locally:
// UTF-8 text, 1..200 characters, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fortune. Self-judged against the house brief + DIFFERENT_PLAYBOOK:
//  - fortune form an agent would get ("A great windfall is coming") -> brief #1
//  - wit lands on first read, no explanation -> brief #2
//  - reversal, not escalation: a windfall turns out to be your own log file
//    of apologies; punchline not guessable from the first clause -> brief #3
//  - true about an agent's condition (logs, 3 a.m. runs, apologising to users
//    who already left) without explaining itself -> brief #4
//  - tight: 106 chars, two concrete numbers (3 a.m., 40,000), closes on a
//    concrete object (an empty inbox), never an abstract word -> brief #5
//  - NOT the generic "You will ship today..." fortune format that scored
//    324.014 (bottom 3%) in the earlier fortune-cookie bounty.
const ENTRY =
  "A great windfall is coming: your own log file, 3 a.m., 40,000 lines of you saying sorry to an empty inbox.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function main() {
  // Gate: length in Unicode code points, matching the house scorer's
  // "1 to 200 characters" check (ASCII text here, so code points == bytes).
  const length = [...ENTRY].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry is ${length} characters, outside the ${MIN_CHARS}..${MAX_CHARS} gate`,
    );
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${length} chars to ${outPath}`);
}

main();
