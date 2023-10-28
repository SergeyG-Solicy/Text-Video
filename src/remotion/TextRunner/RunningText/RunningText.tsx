import { useEffect, useState } from 'react';
import './styles.css';
import { IRunningTextProps } from './types';

export const RunningText = ({ text }: IRunningTextProps) => {
  const [content, setContent] = useState<string>(text);

  useEffect(() => {
    setContent(text + text);
  }, []);

  return <h2 className="text">{content.toUpperCase()}</h2>;
};
