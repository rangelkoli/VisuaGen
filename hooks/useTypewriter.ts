import { useState, useEffect } from 'react';

/**
 * A custom hook that creates a typewriter effect
 * @param phrases Array of phrases to cycle through
 * @param typingSpeed Speed of typing in milliseconds
 * @param deletingSpeed Speed of deleting in milliseconds
 * @param delayBetweenPhrases Delay between phrases in milliseconds
 */
export const useTypewriter = (
  phrases: string[],
  typingSpeed = 300,
  deletingSpeed = 200,
  delayBetweenPhrases = 500
) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;

    let timeout: NodeJS.Timeout;

    const handleTyping = () => {
      const currentPhrase = phrases[currentIndex];
      
      if (isDeleting) {
        // Handle deleting text
        setCurrentText(currentPhrase.substring(0, currentText.length - 1));
        
        // If all text is deleted, start typing the next phrase
        if (currentText.length === 1) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % phrases.length);
          timeout = setTimeout(handleTyping, delayBetweenPhrases);
          return;
        }
        
        timeout = setTimeout(handleTyping, deletingSpeed);
      } else {
        // Handle typing text
        setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        
        // If all text is typed, start deleting
        if (currentText.length === currentPhrase.length) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
            handleTyping();
          }, delayBetweenPhrases);
          return;
        }
        
        timeout = setTimeout(handleTyping, typingSpeed);
      }
    };

    timeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases]);

  return currentText;
};
