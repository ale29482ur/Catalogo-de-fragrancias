import React, { useState, useEffect } from 'react';
import { perfumesData } from './components/perfumes';
import './App.css';

function App() {
  const [busca, setBusca] = useState('');
  const [vibeSelecionada, setVibeSelecionada] = useState('Todos'); // Novo estado
  const [aberto, setAberto] = useState(null);
  const [idxImg, setIdxImg] = useState(0);
  const [visiveis, setVisiveis] = useState(10);

  const FONE = "5517991954193";

  // Lista de vibes para os botões
  const vibes = ["Todos", "Quente", "Frio", "Fresco", "Doce"];

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : 'auto';
  }, [aberto]);

  // Lógica de filtragem: Texto (nome/marca) + Categoria (vibe)
  const filtrados = perfumesData.filter(p => {
    const matchesTexto = p.nome.toLowerCase().includes(busca.toLowerCase()) || 
                         p.marca.toLowerCase().includes(busca.toLowerCase());
    
    const matchesVibe = vibeSelecionada === 'Todos' || p.vibe === vibeSelecionada;

    return matchesTexto && matchesVibe;
  });

  return (
    <div className="App">
      {/* HEADER */}
      <header className="header">
        <img style={{width:'8vh', height:'5vh'}} src="sa.png" alt="Logo" />
        <input 
          className="search-bar" 
          placeholder="Busque sua fragrância favorita..." 
          onChange={(e) => setBusca(e.target.value)}
        />
        <div style={{width: '20vh', textAlign: 'center'}} className="hide-mobile">
          <span style={{fontSize: '1.5vh', fontWeight: 'bold'}}>STUDIO AROMATA</span>
        </div>
      </header>

      {/* SEÇÃO DE FILTROS (VIBES) */}
      <div className="filter-wrapper">
        <div className="filter-container">
          {vibes.map(v => (
            <button 
              key={v}
              className={`filter-chip ${vibeSelecionada === v ? 'active' : ''}`}
              onClick={() => {
                setVibeSelecionada(v);
                setVisiveis(10); // Reseta a paginação ao trocar filtro
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <main className="container">
        <div className="product-grid">
          {filtrados.slice(0, visiveis).map(p => (
            <div key={p.id} className="card" onClick={() => { setAberto(p); setIdxImg(0); }}>
              <img src={p.imagens[0]} alt={p.nome} />
              <div className="card-info">
                <p className="card-brand">{p.marca}</p>
                <h3 className="card-name">{p.nome}</h3>
              </div>
            </div>
          ))}
        </div>

        {filtrados.length === 0 && (
          <div style={{textAlign: 'center', padding: '50px', opacity: 0.5}}>
            Nenhum perfume encontrado com esses critérios.
          </div>
        )}

        {visiveis < filtrados.length && (
          <div style={{ textAlign: "center", margin: "40px 0" }}>
            <button className="btn-load-more" onClick={() => setVisiveis(prev => prev + 10)}>
              Carregar mais
            </button>
          </div>
        )}
      </main>

      {/* MODAL */}
      {aberto && (
        <div className="modal-overlay" onClick={() => setAberto(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className='close-modal' onClick={() => setAberto(null)}> 
               <img src="/images/212/close.png" className='img-icon' alt="fechar" />
            </button>
            
            <div className="carousel-area">
              <img src={aberto.imagens[idxImg]} className="main-img" alt="Perfume" />
              <button className="nav-btn btn-prev" onClick={() => setIdxImg(idxImg === 0 ? aberto.imagens.length - 1 : idxImg - 1)}>&#10094;</button>
              <button className="nav-btn btn-next" onClick={() => setIdxImg(idxImg === aberto.imagens.length - 1 ? 0 : idxImg + 1)}>&#10095;</button>

              <div className="dots">
                {aberto.imagens.map((_, i) => (
                  <span key={i} className={`dot ${idxImg === i ? 'active' : ''}`} onClick={() => setIdxImg(i)}></span>
                ))}
              </div>
            </div>

            <div className="modal-details">
              <p className="card-brand">{aberto.marca}</p>
              <h2 className="card-name" style={{fontSize: '2rem'}}>{aberto.nome}</h2>
              <p style={{fontSize: '0.9rem', color: '#666', marginTop: '10px'}}>{aberto.descricao}</p>

              <div className="notes">
                <p><strong>Topo:</strong> {aberto.notas.topo.join(', ')}</p>
                <p><strong>Coração:</strong> {aberto.notas.coracao.join(', ')}</p>
                <p><strong>Base:</strong> {aberto.notas.base.join(', ')}</p>
              </div>

              <div className="wa-buttons">
                {Object.entries(aberto.precos).map(([ml, preco]) => (
                  <a 
                    key={ml}
                    className="wa-link"
                    href={`https://wa.me/${FONE}?text=Olá! Tenho interesse no ${aberto.nome} (${ml})`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{ml} — R$ {preco}</span>
                    <span style={{fontSize: '0.7rem'}}>COMPRAR</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WHATSAPP FLOAT */}
      <a href={`https://wa.me/${FONE}`} className="float-wa" target="_blank" rel="noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="30" alt="WhatsApp" />
      </a>
    </div>
  );
}

export default App;