'use client';

import usePopupMenuStore, { PopupMenuState } from '@/hooks/popupMenuStore';
import { useEffect, useId, useRef } from 'react';

interface DropdownProps {
    group: PopupMenuState;
    label: React.ReactNode;
    items: { title: string; tooltip?: string; disabled?: boolean; select?: boolean; onClick?: () => void; onChange?: () => void }[];
    areaLabel: string;
}

export default function DropdownMenu({ group, label, items, areaLabel }: DropdownProps) {
    const { popupMenuState, setPopupMenuState } = usePopupMenuStore();
    const rootRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelId = useId();
    const open = popupMenuState === group;

    useEffect(() => {
        if (!open) return;
        const selected = panelRef.current?.querySelector<HTMLButtonElement>('button[aria-pressed="true"]:not(:disabled)');
        const first = panelRef.current?.querySelector<HTMLButtonElement>('button:not(:disabled)');
        (selected ?? first)?.focus();
        const outside = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setPopupMenuState(PopupMenuState.None);
        };
        document.addEventListener('pointerdown', outside);
        return () => document.removeEventListener('pointerdown', outside);
    }, [open, setPopupMenuState]);

    const close = () => {
        setPopupMenuState(PopupMenuState.None);
        buttonRef.current?.focus();
    };

    return (
        <div ref={rootRef} className={`relative rounded-lg size-[40px] ${open ? 'bg-selection' : ''}`}
            onBlur={(event) => {
                if (open && !event.currentTarget.contains(event.relatedTarget)) setPopupMenuState(PopupMenuState.None);
            }}
            onKeyDown={(event) => {
                if (open && event.key === 'Escape') { event.preventDefault(); close(); }
                if (open && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
                    event.preventDefault();
                    const buttons = Array.from(panelRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? []);
                    const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
                    const index = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (current + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
                    buttons[index]?.focus();
                }
            }}>
            <button type="button" ref={buttonRef} aria-label={areaLabel} aria-expanded={open} aria-controls={open ? panelId : undefined}
                onClick={() => setPopupMenuState(group)} className="hover:bg-selection box-content p-2 rounded-lg transition focus-visible:outline-2">
                {label}
            </button>
            {open && (
                <div id={panelId} ref={panelRef} role="group" aria-label={areaLabel}
                    className="z-50 absolute mt-2 right-0 min-w-[120px] w-fit bg-gray-50 dark:bg-gray-75 border shadow-xs rounded-lg p-2 flex flex-col gap-1">
                    {items.map(item => (
                        <button type="button" key={item.title} title={item.tooltip} disabled={item.disabled} aria-pressed={Boolean(item.select)}
                            className={`p-1 rounded-md text-center hover:bg-selection focus-visible:outline-2 disabled:opacity-40 disabled:cursor-not-allowed ${item.select ? 'bg-selection' : ''}`}
                            onClick={() => { item.onClick?.(); item.onChange?.(); close(); }}>
                            {item.title}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
