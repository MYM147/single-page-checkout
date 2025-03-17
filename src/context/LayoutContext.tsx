import { ReactNode, createContext, useContext, useState } from 'react';

type MembershipType = 'PRO' | 'DIY';

interface MembershipContextType {
	membershipType: MembershipType;
	setMembershipType: (type: MembershipType) => void;
}

interface MembershipProviderProps {
	children: ReactNode;
}

const MembershipContext = createContext<MembershipContextType | undefined>(
	undefined
);

export const useMembership = () => {
	const context = useContext(MembershipContext);
	if (!context) {
		throw new Error('useMembership must be used within a MembershipProvider');
	}
	return context;
};

export const MembershipProvider = ({ children }: MembershipProviderProps) => {
	const [membershipType, setMembershipType] = useState<MembershipType>('DIY');

	return (
		<MembershipContext.Provider value={{ membershipType, setMembershipType }}>
			{children}
		</MembershipContext.Provider>
	);
};
