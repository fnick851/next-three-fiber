import { MutableRefObject, useEffect } from "react";

export default function useFullScreen(ref: MutableRefObject<any>) {
  useEffect(() => {
    const view = ref.current;
    const originalW = view.offsetWidth;
    const revertWidth = () => {
      view.style.width = originalW + "px";
    };

    view.addEventListener("dblclick", () => {
      const fullscreenElement =
        document.fullscreenElement || document.webkitFullscreenElement;
      if (!fullscreenElement) {
        if (view.requestFullscreen) {
          view.requestFullscreen();
        } else if (view.webkitRequestFullscreen) {
          view.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    });

    document.addEventListener("fullscreenchange", revertWidth);
    document.addEventListener("webkitfullscreenchange", revertWidth);
    document.addEventListener("mozfullscreenchange", revertWidth);
    document.addEventListener("MSFullscreenChange", revertWidth);
  });
}
