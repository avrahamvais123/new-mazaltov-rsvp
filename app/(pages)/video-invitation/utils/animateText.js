import { cn } from "@/lib/utils";

export const animteText = ({ text, lineStyle, lettersStyle, delayConfig }) => {
  let accumulatedDelay = delayConfig.text.startDelay || 0; // דיליי התחלה לשורה הראשונה בלבד

  return (
    <>
      {text
        .split("\n")
        .map((line) => line.trim()) // הסרת רווחים מיותרים מכל שורה
        .map((line, lineIndex) => {
          const { letterDelay } = delayConfig.text;

          const currentLineStartDelay =
            lineIndex === 0 ? accumulatedDelay : accumulatedDelay;

          return (
            <span
              key={lineIndex}
              //className="text-center flex-center text-white"
              style={lineStyle(currentLineStartDelay)}
            >
              {line.split("").map((letter, letterIndex) => {
                const currentLetterDelay = accumulatedDelay;
                accumulatedDelay += letterDelay;

                return (
                  <span
                    key={letterIndex}
                    style={{
                      paddingTop: 16,
                      overflow: "hidden",
                    }}
                    //className="pt-4 overflow-hidden"
                  >
                    <p
                      //className={cn("text-5xl", letter === " " && "mx-2")}
                      style={lettersStyle(currentLetterDelay, letter)}
                    >
                      {letter}
                    </p>
                  </span>
                );
              })}
            </span>
          );
        })}
    </>
  );
};
