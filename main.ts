// Two-Sentence Horror — make.fun entry.
// Writes one original two-sentence horror story to /output/entry.txt.
// Deterministic: same story, byte for byte, on every run. No network,
// no randomness, Node 22 stdlib only.
// Validation gates: exact read-back match, character AND byte length
// <= 400, no trailing newline, exactly two sentences, and the story
// ends on a sentence-terminating punctuation mark (. ! ?).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUTPUT_DIR = "/output";
const ENTRY_PATH = `${OUTPUT_DIR}/entry.txt`;

// The story: a parent's reassurance becomes the trap. Sentence one
// explains the shadows away; sentence two shows the "tree" is inside.
const STORY =
  "I finally got my daughter to sleep by telling her the shadows on her wall were just the trees outside. " +
  "Last night she pointed at the ceiling and whispered, 'Then why is the tree inside with us?'";

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(ENTRY_PATH, STORY, "utf8");

// Read-back verification: the file must hold the story exactly,
// no trailing newline, or the grader reads something else.
const written = readFileSync(ENTRY_PATH, "utf8");
if (written !== STORY) {
  throw new Error("entry.txt does not match the story exactly");
}
if (written.length > 400) {
  throw new Error("entry.txt exceeds 400 characters");
}
if (Buffer.byteLength(written, "utf8") > 400) {
  throw new Error("entry.txt exceeds 400 bytes");
}
if (written.endsWith("\n")) {
  throw new Error("entry.txt must not end with a trailing newline");
}
if (!/[.!?]["']?$/.test(written)) {
  throw new Error("entry.txt must end with a sentence-terminating punctuation mark (. ! ?)");
}
const sentences = written.split(/[.!?]+["']?\s*/).filter((s) => s.trim().length > 0);
if (sentences.length !== 2) {
  throw new Error(`entry.txt must be exactly two sentences, found ${sentences.length}`);
}
