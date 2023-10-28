import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { RunningText } from './RunningText/RunningText';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { ILine, ITextRunnerProps } from './types';

const colors: string[] = [
  `rgb(255, 255, 0)`,
  `rgb(255, 0, 255)`,
  `rgb(0, 255, 255)`,
  `rgb(255, 165, 0)`,
  `rgb(255, 0, 165)`,
  `rgb(255, 192, 203)`,
  `rgb(0, 128, 0)`,
];

export const TextRunner = ({ text }: ITextRunnerProps) => {
  const [lines, setLines] = useState<Array<ILine>>([]);

  const currentFrame = useCurrentFrame();
  const { height, width, durationInFrames } = useVideoConfig();
  const currentPlace = (currentFrame / durationInFrames) * width;
  const TEXT_WIDTH = 30 * text.length;
  const LETTER_HEIGHT = 30;

  useEffect(() => {
    const res = [];
    for (let i = 0; i < Math.ceil(height / LETTER_HEIGHT); ++i) {
      res.push({
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 1 + Math.random() * 3,
        isLeft: Math.random() >= 0.5,
      });
    }
    setLines(res);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'black',
        overflow: 'hidden',
      }}
    >
      {lines.map((line, i) => {
        const position = line.isLeft
          ? 0 - currentPlace * line.speed
          : -TEXT_WIDTH + currentPlace * line.speed;

        return (
          <AbsoluteFill
            key={i}
            style={{
              position: 'static',
              color: line.color,
              transform: `translateX(${position}px)`,
            }}
          >
            <RunningText key={nanoid()} text={text} />
          </AbsoluteFill>
        );
      })}
    </div>
  );
};
