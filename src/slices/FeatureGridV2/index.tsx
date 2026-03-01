import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FeatureGridV2`.
 */
export type FeatureGridV2Props =
  SliceComponentProps<Content.FeatureGridV2Slice>;

/**
 * Component for "FeatureGridV2" Slices.
 */
const FeatureGridV2: FC<FeatureGridV2Props> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for feature_grid_v2 (variation: {slice.variation})
      slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
      {/**
       * 💡 Use the Prismic MCP server with your code editor
       * 📚 Docs: https://prismic.io/docs/ai#code-with-prismics-mcp-server
       */}
    </section>
  );
};

export default FeatureGridV2;
