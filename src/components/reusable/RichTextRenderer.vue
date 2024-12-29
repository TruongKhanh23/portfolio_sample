<template>
  <div
    v-html="renderedHtml || '<p>No content available</p>'"
    class="prose max-w-none mx-auto text-gray-700 dark:text-gray-300"
  ></div>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

export default {
  name: "RichTextRenderer",
  props: {
    content: {
      type: Object,
      required: true, // Nhận rich text JSON từ Contentful
    },
  },
  computed: {
    renderedHtml() {
      const options = {
        renderMark: {
          [MARKS.BOLD]: (text) =>
            `<strong class="font-bold text-black dark:text-white">${text}</strong>`,
          [MARKS.ITALIC]: (text) =>
            `<em class="italic text-gray-600 dark:text-gray-300">${text}</em>`,
          [MARKS.UNDERLINE]: (text) => `<span class="underline">${text}</span>`,
        },
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node) => {
            let paragraphHtml = `<p class="mb-4 text-base leading-relaxed dark:text-gray-300 text-justify">`;

            node.content.forEach((childNode) => {
              if (childNode.nodeType === "hyperlink") {
                const linkText = childNode.content[0]?.value; // Văn bản của hyperlink
                const linkUrl = childNode.data.uri; // URL của hyperlink
                // Chèn thẻ <a> vào văn bản của hyperlink, không thay đổi các mark khác của văn bản
                paragraphHtml += `<a href="${linkUrl}" class="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500" target="_blank">${linkText}</a>`;
              } else if (childNode.nodeType === "text") {
                // Nếu là văn bản, kiểm tra nếu có marks để thêm các kiểu dáng (bold, italic, underline)
                let textContent = childNode.value;

                // Kiểm tra nếu có các marks (bold, italic, underline)
                if (childNode.marks.length > 0) {
                  childNode.marks.forEach((mark) => {
                    if (mark.type === MARKS.BOLD) {
                      textContent = `<strong class="font-bold text-black dark:text-white">${textContent}</strong>`;
                    }
                    if (mark.type === MARKS.ITALIC) {
                      textContent = `<em class="italic text-gray-600 dark:text-gray-300">${textContent}</em>`;
                    }
                    if (mark.type === MARKS.UNDERLINE) {
                      textContent = `<span class="underline">${textContent}</span>`;
                    }
                  });
                }

                paragraphHtml += textContent; // Thêm văn bản đã được định dạng vào paragraph
              }
            });

            paragraphHtml += `</p>`;
            return paragraphHtml;
          },
          [BLOCKS.HEADING_1]: (node, next) =>
            `<h1 class="text-4xl font-extrabold mb-6 text-primary dark:text-primary-light">${next(
              node.content
            )}</h1>`,
          [BLOCKS.HEADING_2]: (node, next) =>
            `<h2 class="text-3xl font-semibold mb-5 text-primary dark:text-primary-light">${next(
              node.content
            )}</h2>`,
          [BLOCKS.HEADING_3]: (node, next) =>
            `<h3 class="text-2xl font-semibold mb-4 text-primary dark:text-primary-light">${next(
              node.content
            )}</h3>`,
          [BLOCKS.HEADING_4]: (node, next) =>
            `<h4 class="text-xl font-medium mb-3 text-primary dark:text-primary-light">${next(
              node.content
            )}</h4>`,
          [BLOCKS.HEADING_5]: (node, next) =>
            `<h5 class="text-lg font-medium mb-2 text-primary dark:text-primary-light">${next(
              node.content
            )}</h5>`,
          [BLOCKS.HEADING_6]: (node, next) =>
            `<h6 class="text-md font-medium mb-2 text-primary dark:text-primary-light">${next(
              node.content
            )}</h6>`,
          [BLOCKS.HYPERLINK]: (node, next) =>
            `<a href="${
              node.data.uri
            }" class="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500" target="_blank">${next(
              node.content
            )}</a>`,
          [BLOCKS.UL_LIST]: (node, next) =>
            `<ul class="list-disc pl-6 dark:text-gray-300">${next(
              node.content
            )}</ul>`,
          [BLOCKS.OL_LIST]: (node, next) =>
            `<ol class="list-decimal pl-6 dark:text-gray-300">${next(
              node.content
            )}</ol>`,
          [BLOCKS.LIST_ITEM]: (node, next) =>
            `<li class="mb-1 dark:text-gray-300">${next(node.content)}</li>`,
          [BLOCKS.QUOTE]: (node, next) =>
            `<blockquote class="border-l-4 border-indigo-500 pl-4 italic text-gray-500 my-4 dark:text-gray-300 dark:border-indigo-400">${next(
              node.content
            )}</blockquote>`,
          [BLOCKS.EMBEDDED_ENTRY]: (node) =>
            `<div class="border border-gray-200 p-4 rounded-md dark:border-gray-700">Embedded content: ${JSON.stringify(
              node.data
            )}</div>`,
        },
        preserveWhitespace: true, // Bảo toàn khoảng trắng
      };

      return documentToHtmlString(this.content, options);
    },
  },
};
</script>
