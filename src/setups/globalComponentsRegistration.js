import Button from "@/components/reusable/Button.vue";
import RichTextRenderer from "@/components/reusable/RichTextRenderer.vue";
import SkeletonLoader from '@/components/reusable/SkeletonLoader.vue'
import LazyImage from "@/components/reusable/LazyImage.vue"
import Slider from "@/components/reusable/Slider.vue";
import JText from "@/components/base/JText.vue";
import JFlex from "@/components/base/JFlex.vue";
import JIcon from "@/components/base/JIcon/index.vue";
import JSpinner from "@/components/base/JSpinner.vue";
import CLayout from "@/components/reusable/CLayout.vue";

// Register components globally
const baseComponents = {
  JFlex,
  JText,
  JSpinner,
  JIcon,
  CLayout,
};

const coreComponents = {
  Button,
  RichTextRenderer,
  SkeletonLoader,
  Slider,
  LazyImage
};

// Inject variant resolver function into base components
Object.keys(baseComponents).forEach((fileName) => {
  const component = baseComponents[fileName];
  const currentInject = component?.inject ?? [];
  component.inject = [...currentInject, "getComponentVariants"]; // this is provided on app level
});

// Register
const components = { ...baseComponents, ...coreComponents };
export default (app) => {
  Object.keys(components).forEach((fileName) => {
    const componentConfig = components[fileName];
    app.component(fileName, componentConfig.default || componentConfig);
  });
};
