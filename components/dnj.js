import * as React from "react"

//https://transform.tools/
//https://frontend-digest.com/how-to-import-svgs-into-nextjs-8ec6100e613f

function DNJ(props) {
    return (
        <svg
            width="295.38124999999997px"
            height="188px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="102.30937500000002 -19 295.38124999999997 188"

            preserveAspectRatio="xMidYMid"
            {...props}
        >
            <defs>
                <filter id="editing-extrude-glow">
                    <feFlood floodColor="#000" result="flood-1" />
                    <feMorphology radius={1} in="SourceAlpha" result="erode" />
                    <feComposite operator="in" in="flood-1" in2="erode" result="comp1" />
                    <feConvolveMatrix
                        order="0,0"
                        divisor={1}
                        in="comp1"
                        result="convolve"
                    />
                    <feOffset in="convolve" result="extrude" />
                    <feComposite
                        operator="in"
                        in="flood-1"
                        in2="extrude"
                        result="comp-extrude"
                    />
                    <feFlood floodColor="#000" result="flood-2" />
                    <feComposite
                        operator="in"
                        in="flood-2"
                        in2="SourceAlpha"
                        result="comp2"
                    />
                    <feMorphology
                        operator="dilate"
                        radius={1}
                        in="comp2"
                        result="dilate"
                    />
                    <feOffset in="dilate" result="offset" />
                    <feGaussianBlur in="offset" stdDeviation={5.8} result="blur" />
                    <feComponentTransfer in="blur" result="shadow">
                        <feFuncA type="linear" slope={0.8} intercept={-0.2} />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode in="shadow" />
                        <feMergeNode in="comp-extrude" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <g filter="url(#editing-extrude-glow)">
                <path
                    d="M38.77 0H13.28Q7.99 0 6.16-.76q-1.84-.75-1.84-2.48v-68.15q0-2.81 2.38-4.05 2.37-1.24 8.2-1.24h24.3q20.74 0 28.62 8.15 7.89 8.16 7.89 29.65T67.5-8.69Q59.29 0 38.77 0zm-.86-60.59q-2.59 0-3.46.43v43.64l4.11.43q3.24 0 4.91-5.19 1.67-5.18 1.67-17.92 0-12.75-1.72-17.07-1.73-4.32-5.51-4.32zM113.4-3.13q0 1.4-6.64 2.27-6.64.86-13.23.86-6.59 0-8.43-.76-1.83-.75-1.83-2.37v-66.31q0-2.7 6.21-4.97 6.21-2.27 14.09-2.27 2.81 0 4.21.22 3.68.54 5.19 4.64l10.37 27.86h.43v-25.48q0-2.7 6.15-4.97 6.16-2.27 14.04-2.27 6.81 0 8.64 2.59 1.3 1.84 1.3 3.35v67.61q0 1.4-6.64 2.27-6.64.86-14.58.86t-8.7-2.05l-10.04-26.57h-.54v25.49zm81.38 11.18q-2.11 3.61-6.16 5.07-4.05 1.46-9.18 1.46t-7.5-.16q-2.38-.16-5.03-.87-2.64-.7-4.15-1.89-3.46-2.91-3.46-9.07 0-8.85 4.54-8.85 1.4 0 2.16-.44 2.05-.97 2.05-6.69v-56.27q0-2.38 6.21-4.7 6.21-2.32 13.23-2.32 10.69 0 10.69 5.08v59.72q0 7.45-.65 11.88-.65 4.43-2.75 8.05z"
                    transform="translate(148.75 120.63)"
                />
            </g>
            <style />
        </svg>
    )
}

export default DNJ
