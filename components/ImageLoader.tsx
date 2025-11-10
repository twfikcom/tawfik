import React from 'react';
import { TIcon } from './icons';

const ImageLoader: React.FC = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-dark-card/80">
        <TIcon className="w-10 h-10 text-primary animate-loader-pulse" />
    </div>
);

export default ImageLoader;
