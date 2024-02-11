import './author.scss';

export default function Author({ userFirstname, userLastname }) {

	return (
		<div className="author">
			<p>
				Publié par :
				<span>
					{userFirstname} {userLastname}
				</span>
			</p>
		</div>
	)
}