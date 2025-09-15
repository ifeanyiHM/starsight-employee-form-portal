// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// export const generatePDFFromSections = async (
//   sectionIds: string[]
// ): Promise<jsPDF> => {
//   const pdf = new jsPDF("p", "mm", "a4");
//   const pageWidth = pdf.internal.pageSize.getWidth();
//   const pageHeight = pdf.internal.pageSize.getHeight();

//   // 🔹 Reusable function to temporarily set styles and store originals
//   const storeAndApplyTransform = (
//     selector: string,
//     tempTransform: string,
//     storage: { el: HTMLElement; transform: string }[]
//   ) => {
//     document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
//       storage.push({
//         el,
//         transform: el.style.transform,
//       });
//       el.style.transform = tempTransform;
//     });
//   };

//   // // Arrays to store original styles
//   const originalTitles: { el: HTMLElement; transform: string }[] = [];
//   // const originalDetails: { el: HTMLElement; transform: string }[] = [];

//   // // 🔹 Apply temporary styles
//   storeAndApplyTransform(".title", "translateY(-6px)", originalTitles);
//   // storeAndApplyTransform(".deta", "translateY(-3px)", originalDetails);

//   // 🔹 Loop through each section and generate PDF pages
//   for (let i = 0; i < sectionIds.length; i++) {
//     const section = document.getElementById(sectionIds[i]);
//     if (!section) continue;

//     const canvas = await html2canvas(section, {
//       scale: 2,
//       useCORS: true,
//       backgroundColor: "#ffffff",
//     });

//     const imgData = canvas.toDataURL("image/jpeg", 1);

//     if (i > 0) pdf.addPage();

//     const scaledHeight = (canvas.height * pageWidth) / canvas.width;

//     if (scaledHeight > pageHeight) {
//       pdf.addImage(
//         imgData,
//         "JPEG",
//         0,
//         0,
//         pageWidth,
//         pageHeight,
//         undefined,
//         "MEDIUM"
//       );
//     } else {
//       pdf.addImage(
//         imgData,
//         "JPEG",
//         0,
//         0,
//         pageWidth,
//         scaledHeight,
//         undefined,
//         "MEDIUM"
//       );
//     }
//   }

//   // ✅ Restore all original styles after PDF generation
//   const restoreOriginalStyles = (
//     storage: { el: HTMLElement; transform: string }[]
//   ) => {
//     storage.forEach(({ el, transform }) => {
//       el.style.transform = transform;
//     });
//   };

//   // // 🔹 Restore both at once
//   restoreOriginalStyles(originalTitles);
//   // restoreOriginalStyles(originalDetails);

//   return pdf;
// };

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDFFromSections = async (
  sectionIds: string[]
): Promise<jsPDF> => {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // ✅ Store original background before replacing
  const replacedInputs: {
    input: HTMLInputElement;
    span: HTMLElement;
    originalBg: string;
  }[] = [];

  // 🔹 Replace all inputs with spans (showing their values)
  document.querySelectorAll<HTMLInputElement>("input").forEach((el) => {
    const span = document.createElement("span");
    span.textContent = el.value || "";
    span.style.transform = "translateY(-8px)";

    const computed = window.getComputedStyle(el);
    const originalBg = computed.backgroundColor; // store the real background

    el.parentNode?.insertBefore(span, el);
    el.style.display = "none";

    replacedInputs.push({ input: el, span, originalBg });
  });

  // 🔹 Reusable function to temporarily set styles and store originals
  const storeAndApplyTransform = (
    selector: string,
    tempTransform: string,
    storage: { el: HTMLElement; transform: string }[]
  ) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      storage.push({
        el,
        transform: el.style.transform,
      });
      el.style.transform = tempTransform;
    });
  };

  // Arrays to store original styles
  const originalTitles: { el: HTMLElement; transform: string }[] = [];
  // const originalDetails: { el: HTMLElement; transform: string }[] = [];

  // 🔹 Apply temporary styles
  storeAndApplyTransform(".title", "translateY(-8px)", originalTitles);
  // storeAndApplyTransform(".deta", "translateY(0)", originalDetails);

  // 🔹 Loop through each section and generate PDF pages
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

    if (scaledHeight > pageHeight) {
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        pageWidth,
        pageHeight,
        undefined,
        "MEDIUM"
      );
    } else {
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        pageWidth,
        scaledHeight,
        undefined,
        "MEDIUM"
      );
    }
  }

  // ✅ Restore original inputs *with original background*
  replacedInputs.forEach(({ input, span, originalBg }) => {
    span.remove();
    input.style.display = "";
    input.style.backgroundColor = originalBg; // put back computed background
  });

  // ✅ Restore all original styles *after* PDF generation is fully complete
  originalTitles.forEach(({ el, transform }) => {
    el.style.transform = transform;
  });

  // originalDetails.forEach(({ el, transform }) => {
  //   el.style.transform = transform;
  // });

  return pdf;
};
