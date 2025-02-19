type Props = {
	title: string;
};

const SectionTitle = ({title}: Props) => {
	return <h2 className='swdc-display-2'>{title}</h2>;
};

export default SectionTitle;
