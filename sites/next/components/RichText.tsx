import { Fragment, ReactElement } from "react";
import { Media, RichText as TRichText } from "cms/generated/types";
import Image from "next/image";

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

type SlateUploadNode = {
  children?: SlateNode[];
  relationTo: string;
  type: "upload";
  value: Media;
};

type SlateNode = SlateDefaultNode | SlateLinkNode | SlateUploadNode;

const serialize = (children?: TRichText["content"]) =>
  children?.filter(Boolean).map((node: SlateNode, i: number) => {
    if ("text" in node) {
      let text: ReactElement = <>{node.text}</>;

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
        return (
          <h1 className="text-4xl" key={i}>
            {serialize(node.children)}
          </h1>
        );
      case "h2":
        return (
          <h2 className="text-3xl" key={i}>
            {serialize(node.children)}
          </h2>
        );
      case "h3":
        return (
          <h3 className="text-2xl" key={i}>
            {serialize(node.children)}
          </h3>
        );
      case "h4":
        return (
          <h4 className="text-xl" key={i}>
            {serialize(node.children)}
          </h4>
        );
      case "h5":
        return (
          <h5 className="text-lg" key={i}>
            {serialize(node.children)}
          </h5>
        );
      case "h6":
        return (
          <h6 className="text-base" key={i}>
            {serialize(node.children)}
          </h6>
        );
      case "blockquote":
      case "ul":
      case "ol":
      case "li":
        return <node.type key={i}>{serialize(node.children)}</node.type>;
      case "link":
        return (
          <a href={encodeURI(node.url)} key={i}>
            {serialize(node.children)}
          </a>
        );
      case "upload":
        return node.value.url ? (
          <img
            alt=""
            key={i}
            src={node.value.url}
            width={node.value.width || 0}
            height={node.value.height || 0}
          />
        ) : null;
      default:
        return <p key={i}>{serialize(node.children)}</p>;
    }
  });

export const RichText = ({ content }: TRichText) => {
  if (!content) return null;
  return <>{serialize(content)}</>;
};
