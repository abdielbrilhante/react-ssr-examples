import React from 'react';
import Markdown from 'markdown-it';

const markdown = Markdown('commonmark');

const times = (count, fn) => Array.from({ length: count }).map((_, index) => fn(index));

const next = ['Enter', 'ArrowRight', 'ArrowDown', 'PageDown', 'n', 'N', ' '];
const previous = ['Backspace', 'ArrowLeft', 'ArrowUp', 'PageUp', 'p', 'P'];

const DECORATORS_REGEXP = /@(?<type>class|id)\.(?<name>[a-zA-Z0-9]+)/ugm;
const VARIABLES_REGEXP = /\$\{(?<name>\w+)\}/ug;

const replaceVariables = (variables) => (match, capture) => variables[capture] ?? match;

const Presentation = ({ source, context = {}, history, match, param = 'index' }) => {
  const index = +match.params[param];

  const [slides, setSlides] = React.useState([]);

  React.useEffect(() => {
    setSlides(source.split('---').map((slide) => {
      const matches = Array.from(slide.matchAll(DECORATORS_REGEXP)).map((item) => item.slice(1));
      return {
        id: matches.filter(([type]) => type === 'id').pop()?.pop(),
        className: matches.filter(([type]) => type === 'class').map(([, name]) => name),
        content: markdown.render(
          slide.replace(DECORATORS_REGEXP, '').replace(VARIABLES_REGEXP, replaceVariables(context)),
        ),
      };
    }));

    document.querySelector('.presentation').focus();
  }, []);

  const handleKeyDown = (event) => {
    const navigate = (slide) => history.push(`${match.path.replace(`:${param}`, slide)}`);
    if (next.includes(event.key)) {
      navigate(Math.min(index + 1, slides.length));
    } else if (previous.includes(event.key)) {
      navigate(Math.max(index - 1, 1));
    }
  };

  const style = {
    right: `${100 * (index - 1)}vw`,
    width: `${100 * slides.length}vw`,
  };

  return (
    <div className="presentation" tabIndex="0" onKeyDown={handleKeyDown} style={style}>
      {slides.map((slide, i) => {
        const className = `slide ${slide.className.join(' ')}`.trim();
        return (
          <div key={i} id={slide.id} className={className}>
            <div
              className="slide-content"
              dangerouslySetInnerHTML={{ __html: slide?.content ?? '' }}
            />
          </div>
        );
      })}
      <div className="progress">
        {times(slides.length, (i) => (
          <div key={i} className={`progress-dot ${i < index ? 'fill' : ''}`.trim()} />
        ))}
      </div>
    </div>
  );
};

export default Presentation;
