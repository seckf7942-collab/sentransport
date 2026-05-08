import { useState } from 'react';
import './App.css';
import Header from './Header';
import Recherche from './Recherche';
import LigneBus from './LigneBus';
import DetailLigne from './DetailLigne';
import Footer from './Footer';
import StatReseau from './StatReseau';

function App() {
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [nbRecherches, setNbRecherches] = useState(0);

  const lignes = [
    { id: 1, numero: "1", depart: "Parcelles Assainies", arrivee: "Plateau", arrets: 14, couleur: "#0a6e31",
      listeArrets: ["Parcelles U14", "Parcelles U10", "Camberene", "Patte d'Oie", "Grand Dakar", "Colobane", "Ponty", "Plateau"] },
    { id: 2, numero: "7", depart: "Guediawaye", arrivee: "Place Obelisque", arrets: 18, couleur: "#e74c3c",
      listeArrets: ["Guediawaye", "Pikine", "Thiaroye", "Keur Massar", "Grand Yoff", "Parcelles", "Liberte 6", "Place Obe"] },
    { id: 3, numero: "15", depart: "Pikine", arrivee: "Medina", arrets: 12, couleur: "#3498db",
      listeArrets: ["Pikine Centre", "Thiaroye Gare", "Hann", "Colobane", "Fass", "Medina"] },
    { id: 4, numero: "23", depart: "Ouakam", arrivee: "Grand Dakar", arrets: 10, couleur: "#9b59b6",
      listeArrets: ["Ouakam Village", "Mermoz", "Fann", "Point E", "Liberte 5", "Grand Dakar"] },
    { id: 5, numero: "8", depart: "Almadies", arrivee: "Colobane", arrets: 16, couleur: "#e67e22",
      listeArrets: ["Almadies", "Ngor", "Yoff", "Ouest Foire", "Liberte 6", "Colobane"] },
    { id: 6, numero: "12", depart: "Yoff", arrivee: "Sandaga", arrets: 11, couleur: "#1abc9c",
      listeArrets: ["Yoff Village", "Aeroport LSS", "Parcelles U17", "Grand Yoff", "HLM", "Sandaga"] },
    { id: 7, numero: "27", depart: "Fann", arrivee: "HLM", arrets: 9, couleur: "#f39c12",
      listeArrets: ["Fann", "Point E", "Amitie", "HLM"] },
    { id: 8, numero: "31", depart: "Liberte", arrivee: "Dieuppeul", arrets: 13, couleur: "#e74c3c",
      listeArrets: ["Liberte 6", "Liberte 5", "Liberte 4", "Dieuppeul"] },
    { id: 9, numero: "42", depart: "Sicap", arrivee: "Medina", arrets: 8, couleur: "#8e44ad",
      listeArrets: ["Sicap Baobab", "Sicap Mbao", "Fass", "Medina"] },
    { id: 10, numero: "18", depart: "HLM", arrivee: "Plateau", arrets: 15, couleur: "#2980b9",
      listeArrets: ["HLM", "Colobane", "Tilene", "Sandaga", "Plateau"] },
  ];

  const lignesFiltrees = lignes.filter(l =>
    l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
    l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
    l.numero.includes(recherche)
  );

  function handleClickLigne(ligne) {
    if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
      setLigneSelectionnee(null);
    } else {
      setLigneSelectionnee(ligne);
    }
  }

  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <StatReseau lignes={lignes} />
        {nbRecherches > 0 && (
          <p className="compteur-recherche">
            Vous avez effectué {nbRecherches} recherche{nbRecherches > 1 ? 's' : ''}
          </p>
        )}
        <Recherche
          valeur={recherche}
          onChange={(valeur) => {
            setRecherche(valeur);
            setNbRecherches(nb => nb + 1);
          }}
        />
        {lignesFiltrees.length === 0 ? (
          <div className="aucun-resultat">
            <p>Aucune ligne trouvée pour "<strong>{recherche}</strong>"</p>
          </div>
        ) : (
          <p className="resultat-recherche">
            {lignesFiltrees.length} ligne{lignesFiltrees.length > 1 ? 's' : ''} trouvée{lignesFiltrees.length > 1 ? 's' : ''}
          </p>
        )}
        {lignesFiltrees.map(ligne => (
          <LigneBus
            key={ligne.id}
            numero={ligne.numero}
            depart={ligne.depart}
            arrivee={ligne.arrivee}
            arrets={ligne.arrets}
            couleur={ligne.couleur}
            estSelectionnee={ligneSelectionnee && ligneSelectionnee.id === ligne.id}
            onClick={() => handleClickLigne(ligne)}
          />
        ))}
        {ligneSelectionnee && <DetailLigne ligne={ligneSelectionnee} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;