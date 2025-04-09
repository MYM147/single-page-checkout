import { IconRegularEdit } from '@prism/dropcloth';

type Props = {
	onEdit?: () => void;
	showEdit?: boolean;
	title: string;
};

const SectionTitle = ({ onEdit, showEdit, title }: Props) => {
	return (
		<div className='swdc-flex swdc-justify-between'>
			<h2 className='swdc-pb-4 swdc-text-xl swdc-font-bold swdc-uppercase swdc-leading-6 swdc-tracking-[2px] md:swdc-pb-[40px] md:swdc-text-[22px]'>
				{title}
			</h2>
			{showEdit && (
				<IconRegularEdit
					className='swdc-cursor-pointer swdc-align-middle'
					onClick={onEdit}
				/>
			)}
		</div>
	);
};

export default SectionTitle;
