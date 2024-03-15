import { useState } from "react";
import { Button, Empty, Modal } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export default function ModalAttachmentPreview(props) {
	const { toggleModalPreviewPdf, setToggleModalPreviewPdf } = props;

	const [numPages, setNumPages] = useState();
	const [pageNumber, setPageNumber] = useState(1);

	const onDocumentLoadSuccess = (e) => {
		setNumPages(e.numPages);
	};

	return (
		<Modal
			title="Grade File Preview"
			wrapClassName="modal-wrap-upload-file-preview"
			open={toggleModalPreviewPdf.open}
			onCancel={() => {
				setToggleModalPreviewPdf({
					open: false,
					data: null,
				});
			}}
			footer={null}
		>
			{toggleModalPreviewPdf.data && toggleModalPreviewPdf.data.pdf_file ? (
				<>
					<Document
						file={toggleModalPreviewPdf.data.pdf_file}
						onLoadSuccess={onDocumentLoadSuccess}
					>
						<Page pageNumber={pageNumber} renderTextLayer={false} />
					</Document>

					<div className="action">
						<Button
							onClick={() => setPageNumber((ps) => (ps > 1 ? ps - 1 : 1))}
							className={pageNumber > 1 ? "btn-main-primary" : ""}
						>
							PREV
						</Button>
						<Button
							onClick={() =>
								setPageNumber((ps) => (ps < numPages ? ps + 1 : numPages))
							}
							className={numPages !== pageNumber ? "btn-main-primary" : ""}
						>
							NEXT
						</Button>
					</div>
				</>
			) : (
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No File Pdf" />
			)}
		</Modal>
	);
}
