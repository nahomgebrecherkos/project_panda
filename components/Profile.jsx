import PromptCard from "./PromptCard";

const Profile = ({
	name,
	desc,
	data,
	handleEdit,
	handleDelete,
	handleProfile,
}) => {
	return (
		<section className="w-full">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{name} profile</span>
			</h1>

			<p className="desc text-left">{desc}</p>
			<div className="mt-16 prompt_layout">
				{data.map((p) => (
					<PromptCard
						post={p}
						key={p._id}
						handleEdit={() => handleEdit && handleEdit(p)}
						handleDelete={() => handleDelete && handleDelete(p)}
						handleProfile={() => handleProfile}
					/>
				))}
			</div>
		</section>
	);
};

export default Profile;
