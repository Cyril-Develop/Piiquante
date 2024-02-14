import ImageIcon from '@mui/icons-material/Image';

export default function SauceForm({ formValues, formError, handleChange, handleSubmit, title, btn }) {

    return (
        <form className="modal_content_form" noValidate onSubmit={handleSubmit}>
            <h2>{title}</h2>
            <div className="modal_content_form_group">
                <label htmlFor="name">Nom</label>
                <input type="text" id="name" name="name" value={formValues.name} onChange={handleChange} />
                {formError.name && <span className="error">{formError.name}</span>}
            </div>
            <div className="modal_content_form_group">
                <label htmlFor="manufacturer">Fabricant</label>
                <input type="text" id="manufacturer" name="manufacturer" value={formValues.manufacturer} onChange={handleChange} />
                {formError.manufacturer && <span className="error">{formError.manufacturer}</span>}
            </div>
            <div className="modal_content_form_group">
                <label htmlFor="description">Description <span>{formValues.description.length} / 400</span></label>
                <textarea id="description" name="description" value={formValues.description} onChange={handleChange} />
                {formError.description && <span className="error">{formError.description}</span>}
            </div>
            <div className="modal_content_form_group">
                <label htmlFor="ingredient">Ingrédients</label>
                <input type="text" id="ingredient" name="ingredient" value={formValues.ingredient} onChange={handleChange} />
                {formError.ingredient && <span className="error">{formError.ingredient}</span>}
            </div>
            <div className="modal_content_form_image">
                <label htmlFor="image" id="select"><span>{btn}</span> <ImageIcon /></label>
                <input type="file" id="image" name="image" onChange={handleChange} />
                {formError.image ?
                    <span className="error">{formError.image}</span> :
                    <p>{!formValues.image && "Aucune photo"}</p>
                }
                {formValues.image && <img src={typeof formValues.image === 'string' ? formValues.image : URL.createObjectURL(formValues.image)} alt="preview" />}
            </div>
            <div className="modal_content_form_group">
                <label htmlFor="heat">Piquant <span>{formValues.heat} / 10</span></label>
                <input type="range" id="heat" name="heat" min={1} max={10} value={formValues.heat} onChange={handleChange} />
            </div>
            <button type="submit">Confirmer</button>
            {formError.message && <span className="error">{formError.message}</span>}
        </form>
    );
};