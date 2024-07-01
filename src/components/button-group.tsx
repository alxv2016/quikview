import React, {useState, useRef, useEffect} from 'react';
import './button-group.scss';

interface ButtonGroupProps {
  label: string;
  buttons: string[];
  onButtonClick: (selectedIndex: number) => void;
  initialActiveIndex?: number;
}

function ButtonGroup({label, buttons, onButtonClick, initialActiveIndex = 0}: ButtonGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(initialActiveIndex);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    onButtonClick(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!buttonRefs) return;
    let newIndex = index;

    switch (e.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % buttons.length;
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + buttons.length) % buttons.length;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleClick(index);
        return;
      default:
        return;
    }

    e.preventDefault();
    setSelectedIndex(newIndex);
    buttonRefs.current[newIndex]?.focus();
  };

  return (
    <div className="button-group" role="radiogroup" aria-label={label}>
      {buttons.map((button, index) => (
        <button
          key={index}
          type="button"
          role="radio"
          aria-checked={selectedIndex === index}
          onClick={() => handleClick(index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          tabIndex={selectedIndex === index ? 0 : -1}
          ref={(el) => (buttonRefs.current[index] = el)}
          className={selectedIndex === index ? 'button-group-btn button-group-btn--active' : 'button-group-btn'}
        >
          {button}
        </button>
      ))}
    </div>
  );
}

export default ButtonGroup;
