import React, { useState } from 'react';

const ProductModal = ({ perfume, onClose }) => {
  const [currentImg, setCurrentImg] = useState(0);

  if (!perfume) return null;

  const imagens = perfume.imagens;

  const nextImg = () => setCurrentImg((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
  const prevImg = () => setCurrentImg((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));

  const buyWhatsApp = (tamanho) => {
    const tel = "5517991954193";
    const msg = encodeURIComponent(`Olá, tenho interesse no perfume ${perfume.nome}, tamanho ${tamanho}.`);
    window.open(`https://wa.me/${tel}?text=${msg}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        
        {/* LADO ESQUERDO: CARROSSEL */}
        <div className="carousel-container">
          <button className="nav-btn prev" onClick={prevImg}>&#10094;</button>
          
          <img 
            src={imagens[currentImg]} 
            alt={`${perfume.nome} view ${currentImg}`} 
            className="carousel-img" 
          />
          
          <button className="nav-btn next" onClick={nextImg}>&#10095;</button>

          {/* Pontinhos Indicadores */}
          <div className="dots-container">
            {imagens.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${currentImg === idx ? 'active' : ''}`}
                onClick={() => setCurrentImg(idx)}
              ></span>
            ))}
          </div>
        </div>

        {/* LADO DIREITO: INFORMAÇÕES */}
        <div className="modal-body">
          <button className="close-modal" onClick={onClose}>&times;</button>
          <p className="brand-label">{perfume.marca}</p>
          <h2 className="perfume-title">{perfume.nome}</h2>
          
          <div className="description-section">
            <p className="description-text">{perfume.descricao}</p>
          </div>

          <div className="notes-grid">
            <div><strong>Topo:</strong> {perfume.notas.topo.join(', ')}</div>
            <div><strong>Coração:</strong> {perfume.notas.coracao.join(', ')}</div>
            <div><strong>Base:</strong> {perfume.notas.base.join(', ')}</div>
          </div>

          <div className="purchase-section">
            <p className="section-label">Selecione o frasco:</p>
            {Object.entries(perfume.precos).map(([tamanho, preco]) => (
              <button key={tamanho} className="wa-buy-btn" onClick={() => buyWhatsApp(tamanho)}>
                <span>{tamanho}</span>
                <span className="price-tag">R$ {preco}</span>
                <span className="buy-text">Comprar no WhatsApp</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;