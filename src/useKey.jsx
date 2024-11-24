import { useEffect } from "react";

export function useKey(key, callback) {
  useEffect(
    function () {
      document.addEventListener("keydown", function (e) {
        if (e.code.toLocaleLowerCase() === key.toLocaleLowerCase()) {
          callback();
          console.log("closing the movie screen");
        }
      });
    },
    [key, callback]
  );
}
