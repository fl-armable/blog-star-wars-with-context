import Card from "../components/Card"

const Carousel = ({ items, type}) => {
    return (
        <div className="cards-carousel-container">
            <div className="cards-carousel-inner">
                {items.map((item, idx) => (
                    <div key={type+idx} className="cards-carousel-item">
                        <Card url={item.url} type={type}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carousel;