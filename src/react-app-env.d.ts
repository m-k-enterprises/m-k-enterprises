/// <reference types="react-scripts" />

declare const module: {
	hot?: {
		dispose: (cb: () => void) => void;
	};
};
