import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef } from 'react';
import ExportButtons from '.';

export default function ExportOverlay({ op = null, ...props }) {

    const exportref = useRef(null)
    return (
        <>
            {props.ui && <button onClick={(e) => exportref.current.toggle(e)}>
                <img
                    src="/images/exportIcon.png"
                    width="20"
                    alt="Export Icon"
                />
            </button>}
            <>
                <OverlayPanel ref={op ? op : exportref} className="[&_.p-overlaypanel-content]:!p-0">
                    <ExportButtons {...props} />
                </OverlayPanel>
            </>
        </>
    )
}
