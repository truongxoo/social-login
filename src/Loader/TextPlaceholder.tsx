import {Skeleton} from 'antd';
import {SkeletonNodeProps} from 'antd/es/skeleton/Node';
import React from 'react';

interface TextPlaceholderProps extends SkeletonNodeProps {
  style?: React.CSSProperties;
  className?: string;
  active?: boolean;
}

const TextPlaceholder: React.FC<TextPlaceholderProps> = ({
  style = {width: '100px', height: '24px'},
  className,
  active,
}) => <Skeleton.Input active={active} className={className} style={style} />;

export default TextPlaceholder;
