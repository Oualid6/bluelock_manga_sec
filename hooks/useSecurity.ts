import { useEffect } from 'react';

export const useSecurity = () => {
    useEffect(() => {
        // Disable right-click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        // Disable keyboard shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent F12, Ctrl+U, Ctrl+S, Ctrl+P, Ctrl+Shift+I
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.key === 'u') ||
                (e.metaKey && e.key === 'u') || // Mac
                (e.ctrlKey && e.key === 's') ||
                (e.metaKey && e.key === 's') || // Mac
                (e.ctrlKey && e.key === 'p') ||
                (e.metaKey && e.key === 'p') || // Mac
                (e.ctrlKey && e.shiftKey && e.key === 'i') ||
                (e.metaKey && e.altKey && e.key === 'i') // Mac
            ) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        // Disable drag and drop of images
        const handleDragStart = (e: DragEvent) => {
            e.preventDefault();
            return false;
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('dragstart', handleDragStart);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('dragstart', handleDragStart);
        };
    }, []);
};
