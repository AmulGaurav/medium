import {
  ParagraphNode,
  TextNode,
  type Klass,
  type LexicalNode,
  type LexicalNodeReplacement,
} from "lexical";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
  [HeadingNode, ParagraphNode, TextNode, QuoteNode];
