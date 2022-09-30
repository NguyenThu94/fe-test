const Testimonial = ({name, link, content, image}) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-card-image">
        <img src={image} alt="avatar" />
      </div>
      <div className="testimonial-card-body">
        <p className="testimonial-card-name">{name}</p>
        <p className="testimonial-card-link">{link}</p>
        <p className="testimonial-card-content">{content}</p>
      </div>
    </div>
  )
}

export default Testimonial;
