import React, { Fragment } from "react";

type SlateLeaves = {
  code?: boolean;
  strikethrough?: boolean;
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
};

type SlateDefaultNode = {
  children?: SlateNode[];
  text?: string;
  type?:
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "ul"
  | "ol"
  | "li"
  | "blockquote";
} & SlateLeaves;

type SlateLinkNode = {
  children?: SlateNode[];
  text?: string;
  type: "link";
  linkType: "custom" | "internal";
  newTab: boolean;
  url: string;
} & SlateLeaves;

type SlateNode = SlateDefaultNode | SlateLinkNode;
type SlateData = SlateNode[];

const serialize = (children?: SlateData) =>
  children?.filter(Boolean).map((node: SlateNode, i: number) => {
    if ("text" in node) {
      let text = <>{node.text}</>;

      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }

      if (node.code) {
        text = <code key={i}>{text}</code>;
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      if (node.underline) {
        text = <u key={i}>{text}</u>;
      }

      if (node.strikethrough) {
        text = <s key={i}>{text}</s>;
      }

      return <Fragment key={i}>{text}</Fragment>;
    }

    switch (node.type) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
      case "blockquote":
      case "ul":
      case "ol":
      case "li": {
        return <node.type key={i}>{serialize(node.children)}</node.type>;
      }
      case "link":
        return (
          <a href={encodeURI(node.url)} key={i}>
            {serialize(node.children)}
          </a>
        );
      default:
        return <p key={i}>{serialize(node.children)}</p>;
    }
  });

export const RichText = ({ content }: { content: SlateData }) => {
  if (!content) return null;
  return serialize(content);
};
