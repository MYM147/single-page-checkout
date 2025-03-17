import { ReactNode, createContext, useContext, useState } from 'react';

type LayoutType = 'PRO' | 'DIY';

interface LayoutContextType {
	layoutType: LayoutType;
	setLayoutType: (type: LayoutType) => void;
}

interface LayoutProviderProps {
	children: ReactNode;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
	const context = useContext(LayoutContext);
	if (!context) {
		throw new Error('useLayout must be used within a LayoutProvider');
	}
	return context;
};

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
	const [layoutType, setLayoutType] = useState<LayoutType>('PRO');

	return (
		<LayoutContext.Provider value={{ layoutType, setLayoutType }}>
			{children}
		</LayoutContext.Provider>
	);
};
