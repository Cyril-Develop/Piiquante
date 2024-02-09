import "./createSauce.scss";
import CloseIcon from "@mui/icons-material/Close";

export default function CreateSauce({ setOpenModal }) {

    const image = false

    return (
        <div className="modal">
            <div className="modal_content">
                <button
                    className="modal_content_btn"
                    onClick={() => setOpenModal(false)}
                >
                    <CloseIcon />
                </button>
                <form className="modal_content_form">
                    <h2>Ajouter une sauce</h2>
                    <div className="modal_content_form_group">
                        <label htmlFor="name">Nom</label>
                        <input type="text" id="name" />
                    </div>
                    <div className="modal_content_form_group">
                        <label htmlFor="manufacturer">Fabricant</label>
                        <input type="text" id="manufacturer" />
                    </div>
                    <div className="modal_content_form_group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" />
                    </div>
                    <div className="modal_content_form_group">
                        <label htmlFor="ingredient">Ingrédients</label>
                        <input type="text" id="ingredient" />
                    </div>
                    <div className="modal_content_form_image">
                        <label htmlFor="image" id="select">Sélectionner une image</label>
                        <input type="file" id="image" />
                        <div id="preview">
                            <p>Aucune photo</p>
                            {image && <img src={image} alt="preview" />}
                        </div>
                    </div>
                    <div className="modal_content_form_group">
                        <label htmlFor="heat">Piquant <span>1 / 10</span></label>
                        <input type="range" id="heat" min={1} max={10} />
                    </div>
                    <button type="submit">Confirmer</button>
                </form>
            </div>
        </div>
    );
}
