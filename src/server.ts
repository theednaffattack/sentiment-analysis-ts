// import express from "express";
import { aposToLexForm } from "../libs/apos-to-lex-form/main";
import { WordTokenizer } from "natural";
import { SpellCorrector } from "../libs/spelling-corrector/main";

const tokenizer = new WordTokenizer();

export const hello = "world";

console.log("sucka free!");

function getSentiment(str: string): -1 | 0 | 1 {
  if (!str.trim()) {
    return 0;
  }
  const lexed = aposToLexForm(str)
    .toLowerCase()
    .replace(/[^a-zA-Z\s]+/g, "");

  const tokenized = tokenizer.tokenize(lexed);
  // default
  return 0;
}
