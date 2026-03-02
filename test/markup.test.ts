import { describe, it, expect } from "bun:test";
import hljs from "highlight.js/lib/core";
import setupJavascript from "../src/javascript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import graphql from "highlight.js/lib/languages/graphql";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

hljs.registerLanguage("javascript", setupJavascript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("graphql", graphql);

const testDir = join(import.meta.dir, "markup", "javascript");
const expectFiles = readdirSync(testDir).filter((f) =>
  f.endsWith(".expect.txt")
);

describe("JavaScript markup tests", () => {
  for (const expectFile of expectFiles) {
    const testName = expectFile.replace(".expect.txt", "");
    const inputFile = testName + ".txt";

    it(testName, () => {
      const input = readFileSync(join(testDir, inputFile), "utf-8");
      const expected = readFileSync(join(testDir, expectFile), "utf-8");
      const result = hljs.highlight(input, { language: "javascript" });

      expect(result.value.trim()).toBe(expected.trim());
    });
  }
});
