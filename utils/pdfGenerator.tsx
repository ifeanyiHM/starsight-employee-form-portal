import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDFFromSections = async (
  sectionIds: string[]
): Promise<jsPDF> => {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Store original background before replacing
  const replacedInputs: {
    input: HTMLInputElement;
    span: HTMLElement;
    originalBg: string;
  }[] = [];

  // Replace inputs with spans
  document.querySelectorAll<HTMLInputElement>("input").forEach((el) => {
    const span = document.createElement("span");
    const isSecondary = el.classList.contains("secondaryinput");

    span.textContent = el.value || (isSecondary ? "" : "Nil");
    span.style.transform = isSecondary
      ? "translateX(32px) translateY(-8px)"
      : "translateY(-8px)";
    // span.style.transform = "translateY(-8px)";

    const computed = window.getComputedStyle(el);
    const originalBg = computed.backgroundColor;

    el.parentNode?.insertBefore(span, el);
    el.style.display = "none";

    replacedInputs.push({ input: el, span, originalBg });
  });

  // Temporary transform for titles
  const originalTitles: { el: HTMLElement; transform: string }[] = [];
  document.querySelectorAll<HTMLElement>(".title").forEach((el) => {
    originalTitles.push({ el, transform: el.style.transform });
    el.style.transform = "translateY(-8px)";
  });

  //Temporarily change background/opacity of .preview elements
  const originalPreviewStyles: {
    el: HTMLElement;
    display: string;
  }[] = [];
  document.querySelectorAll<HTMLElement>(".preview").forEach((el) => {
    const style = window.getComputedStyle(el);
    originalPreviewStyles.push({
      el,
      display: style.display,
    });
    el.style.display = "none";
  });

  // Generate PDF pages
  for (let i = 0; i < sectionIds.length; i++) {
    const section = document.getElementById(sectionIds[i]);
    if (!section) continue;

    const canvas = await html2canvas(section, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/jpeg", 1);
    if (i > 0) pdf.addPage();

    const scaledHeight = (canvas.height * pageWidth) / canvas.width;
    pdf.addImage(
      imgData,
      "JPEG",
      0,
      0,
      pageWidth,
      scaledHeight > pageHeight ? pageHeight : scaledHeight,
      undefined,
      "MEDIUM"
    );
  }

  // Restore everything after the PDF is complete
  replacedInputs.forEach(({ input, span, originalBg }) => {
    span.remove();
    input.style.display = "";
    input.style.backgroundColor = originalBg;
  });

  originalTitles.forEach(({ el, transform }) => {
    el.style.transform = transform;
  });

  originalPreviewStyles.forEach(({ el, display }) => {
    el.style.display = display;
  });

  return pdf;
};
