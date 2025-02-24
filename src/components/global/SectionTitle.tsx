type Props = {
	title: string;
};

const SectionTitle = ({ title }: Props) => {
	return (
		<h2 className="swdc-pb-[40px] swdc-text-[22px] swdc-font-bold swdc-uppercase swdc-leading-6 swdc-tracking-[2px]">
			{title}
		</h2>
	);
};

export default SectionTitle;
