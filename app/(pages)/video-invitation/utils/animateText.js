export const animteText = ({
  text,
  lineStyle,
  lettersStyle,
  startDelay = 0,
  lineDelay = 0,
  letterDelay = 0,
}) => {
  let accumulatedDelay = startDelay; // דיליי התחלה לשורה הראשונה בלבד

  return (
    <>
      {text
        .split("\n")
        .map((line) => line.trim()) // הסרת רווחים מיותרים מכל שורה
        .map((line, lineIndex) => {
          const currentLineStartDelay =
            lineIndex === 0 ? accumulatedDelay : accumulatedDelay;

          return (
            <span key={lineIndex} style={lineStyle(currentLineStartDelay)}>
              {line.split("").map((letter, letterIndex) => {
                const currentLetterDelay = accumulatedDelay;
                accumulatedDelay += letterDelay;

                return (
                  <span
                    key={letterIndex}
                    style={{
                      paddingTop: 16,
                      overflow: "hidden",
                      //border: "10px solid green"
                    }}
                  >
                    <p style={lettersStyle(currentLetterDelay, letter)}>
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
