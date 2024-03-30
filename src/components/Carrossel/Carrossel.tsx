import React, { useState, useEffect } from 'react';
import './Carrossel.css';

const Carrossel = ({ slides }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Função para avançar o slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides?.length - 1 ? 0 : prevSlide + 1));
  };

  // Função para retroceder o slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides?.length - 1 : prevSlide - 1));
  };

  // Configuração do intervalo para trocar de slide automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 3000); // Troca de slide a cada 3 segundos

    return () => clearInterval(interval);
  }, [currentSlide, isPaused]);


    return (
      <div className="carousel" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <button onClick={prevSlide} className="btn">&#10094;</button>
        {slides?.map((slide: any, index: any) => (
          <div key={index} className={index === currentSlide ? 'slide active' : 'slide'}>
            {slide.type === 'image' && <img src={slide.source} alt={slide.alt} className="img-content-slide"/>}
            {slide.type === 'video' && (
              <video autoPlay loop muted>
                <source src={slide.source} type="video/mp4" />
                Seu navegador não suporta vídeos HTML5.
              </video>
          )}
          </div>
        ))}
        <button onClick={nextSlide} className="btn">&#10095;</button>
      </div>
    );
};

export default Carrossel;