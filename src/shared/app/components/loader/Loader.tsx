import * as React from 'react';
import * as styles from './index.css';

export interface ILoaderProps {
}

export const Loader: React.FunctionComponent<ILoaderProps> = () => (
    <div className={styles.loader}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
             preserveAspectRatio="xMidYMid" className="lds-ellipsis"
             style={{background: 'none'}}>
            <circle cx="84" cy="50" r="0" fill="#dce4eb">
                <animate attributeName="r" values="10;0;0;0;0" keyTimes="0;0.25;0.5;0.75;1"
                         keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="0.9s"
                         repeatCount="indefinite" begin="0s"/>
                <animate attributeName="cx" values="84;84;84;84;84" keyTimes="0;0.25;0.5;0.75;1"
                         keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="0.9s"
                         repeatCount="indefinite" begin="0s"/>
            </circle>
            <circle cx="84" cy="50" r="0.55556" fill="#bbcedd">
                <animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1"
                         keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="0.9s"
                         repeatCount="indefinite" begin="-0.45s"/>
                <animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1"
                         keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="0.9s"
                         repeatCount="indefinite" begin="-0.45s"/>
            </circle>
            <circle cx="82.1111" cy="50" r="10" fill="#85a2b6">
                <animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1"
                         keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="0.9s"
                         repeatCount="indefinite" begin="-0.225s"/>
                <animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1"
                         keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="0.9s"
                         repeatCount="indefinite" begin="-0.225s"/>
            </circle>
            <circle cx="48.1111" cy="50" r="10" fill="#fdfdfd">
                <animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1"
                         keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="0.9s"
                         repeatCount="indefinite" begin="0s"/>
                <animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1"
                         keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="0.9s"
                         repeatCount="indefinite" begin="0s"/>
            </circle>
            <circle cx="16" cy="50" r="9.44444" fill="#dce4eb">
                <animate attributeName="r" values="0;0;10;10;10" keyTimes="0;0.25;0.5;0.75;1"
                         keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="0.9s"
                         repeatCount="indefinite" begin="0s"/>
                <animate attributeName="cx" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1"
                         keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="0.9s"
                         repeatCount="indefinite" begin="0s"/>
            </circle>
        </svg>
    </div>
    );
