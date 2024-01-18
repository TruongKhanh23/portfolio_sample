import useModal from "@/composables/modal"
import PdfViewerModal from "@/components/reusable/PdfViewerModal.vue"

export default function usePdfViewerModal() {
  const pdfViewerModal = useModal().create({
    name: "PdfViewerModal",
    content: PdfViewerModal,
    variant: "full",
    onCloseModal() {
      pdfViewerModal.close()
    },
  })

  return pdfViewerModal
}
