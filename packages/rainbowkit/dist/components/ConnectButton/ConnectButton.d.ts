/// <reference types="react" />
import { ResponsiveValue } from '../../css/sprinkles.css';
import { ConnectButtonRenderer } from './ConnectButtonRenderer';
declare type AccountStatus = 'full' | 'avatar' | 'address';
declare type ChainStatus = 'full' | 'icon' | 'name' | 'none';
export interface ConnectButtonProps {
    accountStatus?: ResponsiveValue<AccountStatus>;
    showBalance?: ResponsiveValue<boolean>;
    chainStatus?: ResponsiveValue<ChainStatus>;
    label?: string;
    allowList?: string[];
    blockList?: string[];
}
export declare function ConnectButton({ accountStatus, chainStatus, label, showBalance, allowList, blockList, }: ConnectButtonProps): JSX.Element;
export declare namespace ConnectButton {
    var __defaultProps: {
        readonly accountStatus: "full";
        readonly chainStatus: {
            readonly largeScreen: "full";
            readonly smallScreen: "icon";
        };
        readonly label: "Connect Wallet";
        readonly showBalance: {
            readonly largeScreen: true;
            readonly smallScreen: false;
        };
        readonly allowList: string[];
        readonly blockList: string[];
    };
    var Custom: typeof ConnectButtonRenderer;
}
export {};
